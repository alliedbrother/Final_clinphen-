from flask import Flask, render_template, request, redirect, url_for, session
from final_pharser import test_phrank_pipeline

app = Flask(__name__)
app.secret_key = 'YOUR_SECRET_KEY'  # Required to use sessions

# Mock user data (in production, you'd have a real database)
USERS = {
    "demo": "password123"
}

@app.route('/')
def home():
    # Landing page
    return "Welcome to the Diagnosis Website! <a href='/login'>Login</a>"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Validate credentials (in real life, query your user DB)
        if username in USERS and USERS[username] == password:
            session['logged_in'] = True
            session['username'] = username
            return redirect(url_for('diagnose'))
        else:
            return "Invalid credentials! <a href='/login'>Try again</a>"
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/diagnose', methods=['GET', 'POST'])
def diagnose():
    # Check if the user is logged in
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    if request.method == 'POST':
        # Retrieve symptoms from the form
        symptoms_input = request.form.get('symptoms')
        # Split the symptoms by comma, newline, or space as needed
        symptoms_list = [s.strip() for s in symptoms_input.split(',') if s.strip()]

        # Call your pipeline
        print("KOKOKOKOKOK")
        results = test_phrank_pipeline(symptoms_input)
        print("KOKOKOKOKOKOKKok")
        print(results)
        # Pass results to a results template
        return render_template('result.html', results=results, symptoms=symptoms_list)

    # For GET request, just show the form
    return render_template('diagnose.html')

if __name__ == '__main__':
    app.run(debug=True)
