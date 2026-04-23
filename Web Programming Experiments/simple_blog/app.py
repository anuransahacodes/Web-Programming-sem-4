# Project Title: Simple Blog
# Name: Anuran Saha
# Date: 19 April 2026

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Task 2: In-memory storage (No database required)
# We use a list of dictionaries. An 'id' is added to track which post to edit/delete.
posts = [
    {"id": 1, "title": "Welcome to My Blog", "content": "This is my very first post built with Flask!"}
]
next_id = 2 # Keeps track of the next unique ID

# Task 4: Read & Display (Home Route)
@app.route('/')
def index():
    return render_template('index.html', posts=posts)

# Task 3: Create Operation
@app.route('/create', methods=['GET', 'POST'])
def create():
    global next_id
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        
        if title and content:
            posts.append({"id": next_id, "title": title, "content": content})
            next_id += 1
            return redirect(url_for('index'))
            
    return render_template('create.html')

# Task 5: Update Operation
@app.route('/edit/<int:post_id>', methods=['GET', 'POST'])
def edit(post_id):
    # Find the specific post
    post = next((p for p in posts if p['id'] == post_id), None)
    if not post:
        return redirect(url_for('index'))

    if request.method == 'POST':
        post['title'] = request.form.get('title')
        post['content'] = request.form.get('content')
        return redirect(url_for('index'))

    # Pre-fill form via template
    return render_template('edit.html', post=post)

# Task 6: Delete Operation
@app.route('/delete/<int:post_id>', methods=['POST'])
def delete(post_id):
    global posts
    # Rebuild the list without the deleted post
    posts = [p for p in posts if p['id'] != post_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)