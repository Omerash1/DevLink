<?php
$host = 'localhost';
$port = 8001;
$docRoot = __DIR__ . '/php-analytics';

echo "🚀 Starting DevLink PHP Services...\n";
echo "📍 Server: http://{$host}:{$port}\n";
echo "📁 Document Root: {$docRoot}\n";
echo "🔗 Link Preview: http://{$host}:{$port}/link-preview.php\n";
echo "📊 Dashboard: http://{$host}:{$port}/\n";
echo "\n";
echo "Press Ctrl+C to stop the server\n";
echo "=====================================\n\n";

// Check if port is available
$connection = @fsockopen($host, $port);
if (is_resource($connection)) {
    fclose($connection);
    die("❌ Port {$port} is already in use. Please stop the existing service or use a different port.\n");
}

// Start the PHP development server
$command = "php -S {$host}:{$port} -t {$docRoot}";
passthru($command);
?>