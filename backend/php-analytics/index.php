<?php
// CRITICAL: Headers to allow iframe embedding
header('X-Frame-Options: ALLOWALL');
header('Content-Security-Policy: frame-ancestors *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>DevLink Analytics</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background: #1f2937;
            color: white;
            padding: 15px;
            overflow-x: hidden;
        }
        .chart {
            background: #374151;
            padding: 15px;
            margin: 8px 0;
            border-radius: 8px;
        }
        .stat {
            display: inline-block;
            margin: 8px 12px;
            text-align: center;
        }
        .number {
            font-size: 1.8em;
            font-weight: bold;
            color: #60a5fa;
        }
        h2 { 
            font-size: 1.3em; 
            margin-bottom: 15px;
        }
        h3 { 
            font-size: 1.1em; 
            margin-bottom: 10px;
        }
        p {
            margin: 5px 0;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <h2>📊 DevLink Analytics Dashboard</h2>
   
    <div class="chart">
        <h3>📈 Quick Stats</h3>
        <div class="stat">
            <div class="number"><?php echo rand(10, 50); ?></div>
            <div>Total Links</div>
        </div>
        <div class="stat">
            <div class="number"><?php echo rand(100, 500); ?></div>
            <div>Total Clicks</div>
        </div>
        <div class="stat">
            <div class="number"><?php echo rand(5, 25); ?></div>
            <div>This Week</div>
        </div>
    </div>
   
    <div class="chart">
        <h3>🥇 Most Clicked Links</h3>
        <p>🥇 GitHub - <?php echo rand(20, 50); ?> clicks</p>
        <p>🥈 Stack Overflow - <?php echo rand(15, 35); ?> clicks</p>
        <p>🥉 MDN Web Docs - <?php echo rand(10, 30); ?> clicks</p>
    </div>
   
    <div class="chart">
        <h3>📅 Recent Activity</h3>
        <p>📈 Today: <?php echo rand(5, 20); ?> visits</p>
        <p>📊 Yesterday: <?php echo rand(3, 15); ?> visits</p>
        <p>📅 This Week: <?php echo rand(25, 100); ?> visits</p>
    </div>
   
    <div class="chart">
        <h3>🏷️ Popular Tags</h3>
        <p>💻 Development: <?php echo rand(15, 30); ?> links</p>
        <p>📚 Documentation: <?php echo rand(8, 20); ?> links</p>
        <p>🔧 Tools: <?php echo rand(5, 15); ?> links</p>
    </div>

    <script>
    // Ensure iframe can communicate with parent
    window.parent.postMessage('analytics-loaded', '*');
    </script>
</body>
</html>