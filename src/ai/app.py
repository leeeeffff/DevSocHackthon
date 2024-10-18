from flask import Flask, request, jsonify
from degreeplanner_rnn import generate_course_plan_with_prerequisites_and_terms, generate_reasoning_with_gpt, fetch_comp_courses
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

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
    "name": "Lee",
    "degree": "Computer Science",
    "courses_taken": ["COMP1531", "COMP1234", "MATH1411"]
}

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')

        system_prompt = (
            f"You are a helpful assistant for a student named {user_data['name']} "
            f"who is studying {user_data['degree']}. "
            f"They have taken the following courses: {', '.join(user_data['courses_taken'])}. "
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
