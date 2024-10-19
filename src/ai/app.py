from flask import Flask, request, jsonify
from degreeplanner_rnn import generate_course_plan_with_prerequisites_and_terms, generate_reasoning_with_gpt, fetch_comp_courses
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Connect to PostgreSQL database
def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="pathways",
        user="pathwaysadmin",
        password="pathways123"
)

@app.route('/run-ai', methods=['POST'])
def run_ai():
    try:
        courses_data = fetch_comp_courses()  # Fetch course data dynamically
        course_plan = generate_course_plan_with_prerequisites_and_terms(courses_data)  # Generate course plan
        gpt_reasoning = generate_reasoning_with_gpt(course_plan, courses_data)  # Get GPT reasoning
        return jsonify({"course_plan": course_plan, "reasoning": gpt_reasoning})  # Return the result as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Handle any potential errors

user_data = {
    "name": "Joe Biden",
    "degree": "Database Systems",
    "courses_taken": ["COMP1511"],
    "age": 20,
    "current_student": True,
    "domestic_international": "domestic",
    "gender": "male",
    "career_options": [
        "Data & Technology", 
        "Business & Commerce", 
        "Architecture", 
        "Planning & Construction Management"
    ],
    "courses_per_term": {
        "year1": {"T0": '0', "T1": '3', "T2": '3', "T3": '2'},
        "year2": {"T0": '0', "T1": '3', "T2": '3', "T3": '2'},
        "year3": {"T0": '0', "T1": '3', "T2": '3', "T3": '2'},
        "year4": {"T0": '0', "T1": '0', "T2": '0', "T3": '0'}
    },
    "year_in": 1,
    "summer_term": []
}

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')
        user_id = request.json.get('userId')
        system_prompt = (
            f"You are a helpful assistant for a student named {user_data['name']} "
            f"who is studying {user_data['degree']}. "
            f"They have taken the following courses: {', '.join(user_data['courses_taken'])}. "
            f"The student is currently in year {user_data['year_in']} and identifies as {user_data['gender']}. "
            f"They are a {user_data['domestic_international']} student and "
            f"have career interests in {', '.join(user_data['career_options'])}. "
            "Always personalize your responses based on this information."
        )

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ]
        )

        reply = response.choices[0].message["content"]
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
