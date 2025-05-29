<?php
// backend/php-analytics/index.php
// Main entry point for PHP services - routes to different services
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Router for different PHP services
if (strpos($requestUri, '/link-preview') !== false || strpos($requestUri, '/link-preview.php') !== false) {
    // Route to link preview service
    include __DIR__ . '/../php-services/link-preview.php';
    exit();
}

// Default: Show PHP Services Dashboard
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevLink PHP Services Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 90%;
            text-align: center;
        }
        
        h1 {
            color: #4c51bf;
            margin-bottom: 20px;
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .services {
            display: grid;
            gap: 20px;
            margin: 30px 0;
        }
        
        .service {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 25px;
            text-align: left;
            transition: all 0.3s ease;
        }
        
        .service:hover {
            border-color: #4c51bf;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(76, 81, 191, 0.1);
        }
        
        .service h3 {
            color: #4c51bf;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }
        
        .service p {
            color: #666;
            line-height: 1.6;
        }
        
        .status {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-top: 10px;
        }
        
        .test-section {
            background: #f0f4f8;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .test-form {
            display: flex;
            gap: 10px;
            margin: 15px 0;
        }
        
        input[type="url"] {
            flex: 1;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
        }
        
        button {
            background: #4c51bf;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
        }
        
        button:hover {
            background: #3730a3;
        }
        
        .result {
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 10px;
            text-align: left;
            display: none;
        }
        
        .result.show {
            display: block;
        }
        
        .footer {
            margin-top: 30px;
            color: #666;
            font-size: 0.9rem;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .stat {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #4c51bf;
        }
        
        .stat-label {
            color: #666;
            font-size: 0.9rem;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 DevLink PHP Services</h1>
        <p class="subtitle">High-performance PHP microservices for link management</p>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-number"><?php echo count(glob(__DIR__ . '/../php-services/*.php')); ?></div>
                <div class="stat-label">Active Services</div>
            </div>
            <div class="stat">
                <div class="stat-number"><?php echo date('H:i'); ?></div>
                <div class="stat-label">Server Time</div>
            </div>
            <div class="stat">
                <div class="stat-number"><?php echo phpversion(); ?></div>
                <div class="stat-label">PHP Version</div>
            </div>
        </div>
        
        <div class="services">
            <div class="service">
                <h3>🔗 Link Preview Service</h3>
                <p>Fetches rich metadata from URLs including title, description, images, and favicons. Provides smart tag suggestions based on content analysis.</p>
                <span class="status">✅ Active</span>
            </div>
            
            <div class="service">
                <h3>📊 Analytics Engine</h3>
                <p>Real-time link analytics, click tracking, and usage statistics. Integrates seamlessly with the Vue.js frontend.</p>
                <span class="status">🔄 Ready</span>
            </div>
            
            <div class="service">
                <h3>🏷️ Tag Generator</h3>
                <p>AI-powered tag suggestions based on URL content, domain patterns, and metadata analysis.</p>
                <span class="status">✅ Active</span>
            </div>
        </div>
        
        <div class="test-section">
            <h3>🧪 Test Link Preview Service</h3>
            <p>Enter a URL to test the link preview functionality:</p>
            
            <div class="test-form">
                <input type="url" id="testUrl" placeholder="https://example.com" value="https://github.com">
                <button onclick="testLinkPreview()">Generate Preview</button>
            </div>
            
            <div id="result" class="result">
                <h4>Preview Result:</h4>
                <div id="resultContent"></div>
            </div>
        </div>
        
        <div class="footer">
            <p>DevLink PHP Services • Built with ❤️ for developers</p>
            <p>Integration: <code>fetch('http://localhost:8001/link-preview.php', {...})</code></p>
        </div>
    </div>

    <script>
        async function testLinkPreview() {
            const url = document.getElementById('testUrl').value;
            const resultDiv = document.getElementById('result');
            const contentDiv = document.getElementById('resultContent');
            
            if (!url) {
                alert('Please enter a URL');
                return;
            }
            
            try {
                contentDiv.innerHTML = '<p>🔄 Generating preview...</p>';
                resultDiv.classList.add('show');
                
                const response = await fetch('./link-preview.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                });
                
                const data = await response.json();
                
                if (data.success !== false) {
                    contentDiv.innerHTML = `
                        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 10px 0;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                ${data.favicon ? `<img src="${data.favicon}" width="16" height="16" style="border-radius: 3px;">` : ''}
                                <strong style="color: #4c51bf;">${data.title || 'No title'}</strong>
                            </div>
                            <p style="color: #666; font-size: 0.9rem; margin: 5px 0;">${data.description || 'No description available'}</p>
                            <small style="color: #999;">Domain: ${data.domain || 'Unknown'}</small>
                            ${data.suggestions && data.suggestions.tags ? `
                                <div style="margin-top: 10px;">
                                    <strong style="font-size: 0.8rem; color: #4c51bf;">Suggested Tags:</strong>
                                    <div style="margin-top: 5px;">
                                        ${data.suggestions.tags.map(tag => `<span style="background: #e2e8f0; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-right: 5px;">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        <details style="margin-top: 10px;">
                            <summary style="cursor: pointer; color: #4c51bf;">Raw JSON Response</summary>
                            <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 0.8rem; overflow-x: auto; margin-top: 5px;">${JSON.stringify(data, null, 2)}</pre>
                        </details>
                    `;
                } else {
                    contentDiv.innerHTML = `<p style="color: #e53e3e;">❌ Error: ${data.error || 'Unknown error'}</p>`;
                }
            } catch (error) {
                contentDiv.innerHTML = `<p style="color: #e53e3e;">❌ Network Error: ${error.message}</p>`;
            }
        }
        
        // Auto-test on page load with GitHub
        window.addEventListener('load', () => {
            setTimeout(testLinkPreview, 1000);
        });
    </script>
</body>
</html>