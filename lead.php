<?php
/**
 * Safari.today lead handler: planner signups from the homepage form.
 *
 * For each signup it:
 *   1. appends a row to leads.csv (kept outside public_html when possible),
 *   2. emails the lead to NOTIFY_EMAIL,
 *   3. sends the visitor a short confirmation (optional),
 *   4. adds them to a MailerLite group (optional, only if an API key is set).
 *
 * Answers JSON to the site's JavaScript; plain form posts (no JS) are redirected back.
 */

// ---------- settings ----------
const NOTIFY_EMAIL     = 'inquiries@safari.today';
const FROM_EMAIL       = 'inquiries@safari.today';   // must be a mailbox on this domain
const FROM_NAME        = 'Safari.today';
const SITE_URL         = 'https://safari.today/';
const WHATSAPP_URL     = 'https://wa.me/14694500886';
const SEND_AUTOREPLY   = true;
const MAX_PER_HOUR     = 5;                          // per visitor, to stop form spam

// Optional: MailerLite → Integrations → API → generate token; group ID from Subscribers → Groups.
const MAILERLITE_API_KEY  = '';
const MAILERLITE_GROUP_ID = '';

// ---------- helpers ----------
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function finish(bool $ok, string $error = '', int $status = 200): void {
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($ok ? 200 : $status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    } else {
        // Send them back to the page they signed up on (same site only).
        $back = SITE_URL;
        $ref  = parse_url($_SERVER['HTTP_REFERER'] ?? '');
        if (($ref['host'] ?? '') === parse_url(SITE_URL, PHP_URL_HOST)) $back = SITE_URL . ltrim($ref['path'] ?? '', '/');
        header('Location: ' . $back . ($ok ? '#thanks' : '#planner'), true, 303);
    }
    exit;
}

function dataDir(): string {
    // Prefer a folder next to public_html (not reachable from the web).
    $outside = dirname(__DIR__) . '/safari-leads';
    if (is_dir($outside) || @mkdir($outside, 0750, true)) {
        if (is_writable($outside)) return $outside;
    }
    $inside = __DIR__ . '/leads-data';
    if (!is_dir($inside)) @mkdir($inside, 0750, true);
    if (!file_exists($inside . '/.htaccess')) {
        @file_put_contents($inside . '/.htaccess', "Require all denied\nDeny from all\n");
    }
    return $inside;
}

function clean(string $v, int $max = 200): string {
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $v)), 0, $max);
}

function csvSafe(string $v): string {
    // Stop spreadsheet formula injection when the CSV is opened in Excel/Sheets.
    return preg_match('/^[=+\-@]/', $v) ? "'" . $v : $v;
}

function sendMail(string $to, string $subject, string $body, string $replyTo = ''): bool {
    $headers = [
        'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    if ($replyTo) $headers[] = 'Reply-To: ' . $replyTo;
    $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    return @mail($to, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);
}

// ---------- request ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . SITE_URL, true, 303);
    exit;
}

// Honeypot: real visitors never see this field. Pretend success so bots move on.
if (!empty($_POST['company'])) finish(true);

$email = clean((string)($_POST['email'] ?? ''), 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) finish(false, 'invalid_email', 422);

$source   = clean((string)($_POST['source'] ?? 'planner'), 40);
$referrer = clean((string)($_SERVER['HTTP_REFERER'] ?? ''), 300);
$dir      = dataDir();

// Rate limit by hashed IP (the IP itself is not stored).
$ipHash   = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
$rateFile = $dir . '/rate.json';
$rate     = json_decode((string)@file_get_contents($rateFile), true) ?: [];
$now      = time();
foreach ($rate as $k => $times) {
    $rate[$k] = array_values(array_filter($times, fn($t) => $t > $now - 3600));
    if (!$rate[$k]) unset($rate[$k]);
}
if (count($rate[$ipHash] ?? []) >= MAX_PER_HOUR) finish(false, 'rate_limited', 429);
$rate[$ipHash][] = $now;
@file_put_contents($rateFile, json_encode($rate), LOCK_EX);

// 1. Save
$csv   = $dir . '/leads.csv';
$isNew = !file_exists($csv);
$fh    = @fopen($csv, 'a');
$saved = false;
if ($fh && flock($fh, LOCK_EX)) {
    if ($isNew) fputcsv($fh, ['date_utc', 'email', 'source', 'referrer']);
    $saved = fputcsv($fh, [gmdate('Y-m-d H:i:s'), csvSafe($email), csvSafe($source), csvSafe($referrer)]) !== false;
    flock($fh, LOCK_UN);
}
if ($fh) fclose($fh);

// 2. Notify
$notified = sendMail(
    NOTIFY_EMAIL,
    'New Safari.today lead: ' . $email,
    "New planner signup on Safari.today\n\n" .
    "Email:    $email\n" .
    "Source:   $source\n" .
    "Referrer: " . ($referrer ?: '(direct)') . "\n" .
    "Time:     " . gmdate('Y-m-d H:i') . " UTC\n\n" .
    "Reply to this email to answer them directly.",
    $email
);

if (!$saved && !$notified) finish(false, 'server_error', 500);

// 3. Confirmation to the visitor
if (SEND_AUTOREPLY) {
    sendMail(
        $email,
        'Your First-Time African Safari Planner',
        "Hello,\n\n" .
        "Thanks for requesting The First-Time African Safari Planner from Safari.today. " .
        "We'll send it to this address shortly.\n\n" .
        "If you'd like to talk your trip through in the meantime, message us on WhatsApp: " . WHATSAPP_URL . "\n" .
        "or simply reply to this email.\n\n" .
        "— Safari.today\n" . SITE_URL,
        NOTIFY_EMAIL
    );
}

// 4. MailerLite (optional)
if (MAILERLITE_API_KEY && function_exists('curl_init')) {
    $payload = ['email' => $email];
    if (MAILERLITE_GROUP_ID) $payload['groups'] = [MAILERLITE_GROUP_ID];
    $ch = curl_init('https://connect.mailerlite.com/api/subscribers');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . MAILERLITE_API_KEY,
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

finish(true);
