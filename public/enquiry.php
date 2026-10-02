<?php
/**
 * ZOAC enquiry handler (Verpex shared hosting). Receives the Contact-page form as JSON,
 *   1. emails it to NOTIFY_EMAIL (reply-to = the visitor),
 *   2. keeps a CSV copy outside public_html when possible, in case mail() is flaky.
 * Answers JSON; the site's JS falls back to a mailto: link on any failure.
 */
const NOTIFY_EMAIL = 'zambianoutdooradventures@gmail.com';
const FROM_EMAIL   = 'enquiries@zambianadventures.com';   // must be a mailbox on this domain (create it in cPanel)
const FROM_NAME    = 'ZOAC Website';
const MAX_PER_HOUR = 5;                                     // per visitor, to stop form spam

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');
header('Content-Type: application/json; charset=utf-8');

function done(bool $ok, int $status = 200): void {
    http_response_code($ok ? 200 : $status);
    echo json_encode(['ok' => $ok]);
    exit;
}
function clean(string $v, int $max = 2000): string {
    return mb_substr(trim(preg_replace('/[\r\t]+/', ' ', $v)), 0, $max);
}
function csvSafe(string $v): string {
    return preg_match('/^[=+\-@]/', $v) ? "'" . $v : $v;   // stop spreadsheet formula injection
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') done(false, 405);

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;

if (!empty($data['website'])) done(true);                  // honeypot: pretend success to bots

$f = [];
foreach (['name', 'email', 'phone', 'topic', 'group', 'date', 'message'] as $k) {
    $f[$k] = clean((string)($data[$k] ?? ''), $k === 'message' ? 4000 : 200);
}
if ($f['name'] === '' || !filter_var($f['email'], FILTER_VALIDATE_EMAIL)) done(false, 422);

// Rate limit per visitor IP.
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'x';
$rate = sys_get_temp_dir() . '/zoac-rate-' . md5($ip);
$hits = array_filter(array_map('intval', @file($rate, FILE_IGNORE_NEW_LINES) ?: []), fn($t) => $t > time() - 3600);
if (count($hits) >= MAX_PER_HOUR) done(false, 429);
$hits[] = time();
@file_put_contents($rate, implode("\n", $hits));

// CSV backup (outside public_html when writable, otherwise a denied-by-.htaccess folder).
$dir = dirname(__DIR__) . '/zoac-enquiries';
if (!(is_dir($dir) || @mkdir($dir, 0750, true)) || !is_writable($dir)) {
    $dir = __DIR__ . '/enquiries-data';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    if (!file_exists($dir . '/.htaccess')) @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
}
if ($fh = @fopen($dir . '/enquiries.csv', 'a')) {
    fputcsv($fh, array_merge([date('c')], array_map('csvSafe', array_values($f))));
    fclose($fh);
}

// Email.
$subject = 'Enquiry: ' . ($f['topic'] ?: 'General') . ' - ' . $f['name'];
$body = '';
foreach ($f as $k => $v) $body .= ucfirst($k) . ': ' . $v . "\n";
$headers = [
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . str_replace(["\r", "\n"], '', $f['email']),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
$sent = @mail(NOTIFY_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

done($sent, 500);
