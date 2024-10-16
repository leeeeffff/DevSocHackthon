from flask import Flask, request, jsonify
from degreeplanner_rnn import generate_course_plan_with_prerequisites_and_terms, generate_reasoning_with_gpt, fetch_comp_courses
from flask_cors import CORS

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

if __name__ == "__main__":
    app.run(debug=True)
