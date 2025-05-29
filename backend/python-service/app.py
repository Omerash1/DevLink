from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import os
from flask_cors import CORS
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Download NLTK data
nltk.download('punkt_tab')
nltk.download('stopwords')

@app.route('/api/analyze', methods=['POST'])
def analyze_url():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    try:
        # Fetch URL content
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract metadata
        title = soup.title.string if soup.title else 'No title found'
        
        # Extract description
        description = ''
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            description = meta_desc.get('content', '')
        
        # Extract favicon
        favicon = None
        favicon_link = soup.find('link', rel=lambda r: r and 'icon' in r.lower())
        if favicon_link and favicon_link.get('href'):
            favicon = favicon_link.get('href')
            # Handle relative URLs
            if favicon.startswith('/'):
                parsed_url = urlparse(url)
                favicon = f"{parsed_url.scheme}://{parsed_url.netloc}{favicon}"
        
        # Extract text for analysis
        text = soup.get_text()
        word_count = len(text.split())
        reading_time = round(word_count / 200)  # Average reading speed: 200 words/minute
        
        # Generate tag suggestions
        stop_words = set(stopwords.words('english'))
        word_tokens = word_tokenize(text.lower())
        filtered_words = [w for w in word_tokens if not w in stop_words and w.isalnum() and len(w) > 3]
        
        # Count word frequencies
        word_freq = {}
        for word in filtered_words:
            if word in word_freq:
                word_freq[word] += 1
            else:
                word_freq[word] = 1
        
        # Get top 5 words as tag suggestions
        tag_suggestions = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:5]
        tags = [word for word, freq in tag_suggestions]
        
        return jsonify({
            'title': title,
            'description': description,
            'favicon': favicon,
            'wordCount': word_count,
            'readingTime': reading_time,
            'tagSuggestions': tags
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)