# Project Title: Contact Management System
# Name: Your Name
# Date: Current Date

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Task 2: In-memory storage
contacts = [
    {"id": 1, "name": "Alice Smith", "phone": "555-0100", "email": "alice@example.com"}
]
next_id = 2

# Task 4 & 7: View Contacts and Search
@app.route('/', methods=['GET'])
def index():
    search_query = request.args.get('search', '').lower()
    if search_query:
        filtered = [c for c in contacts if search_query in c['name'].lower() or search_query in c['phone']]
        return render_template('index.html', contacts=filtered, search_query=search_query)
    return render_template('index.html', contacts=contacts)

# Task 3: Add Contact
@app.route('/add', methods=['GET', 'POST'])
def add_contact():
    global next_id
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        
        if name and phone and email:  # Basic validation
            contacts.append({"id": next_id, "name": name, "phone": phone, "email": email})
            next_id += 1
            return redirect(url_for('index'))
    return render_template('add_contact.html')

# Task 5: Edit Contact
@app.route('/edit/<int:contact_id>', methods=['GET', 'POST'])
def edit_contact(contact_id):
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if not contact:
        return redirect(url_for('index'))

    if request.method == 'POST':
        contact['name'] = request.form.get('name')
        contact['phone'] = request.form.get('phone')
        contact['email'] = request.form.get('email')
        return redirect(url_for('index'))
    return render_template('edit_contact.html', contact=contact)

# Task 6: Delete Contact
@app.route('/delete/<int:contact_id>', methods=['POST'])
def delete_contact(contact_id):
    global contacts
    contacts = [c for c in contacts if c['id'] != contact_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)