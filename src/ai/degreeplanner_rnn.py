import os
from request import fetch_comp_courses
import openai
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

openai.api_key = "sk-wXMqfraJj-uktOjeeWyM4L-RA6QdxEhPcoWHOUtTv9T3BlbkFJKWRzWeJ1xWFqwuaptF_5N_9PJNukR9j-bbH7UQ1MoA"

core_courses_prerequisites = {
    "COMP1511": {"prerequisite": []},
    "COMP1521": {"prerequisite": ["COMP1511"]},
    "COMP1531": {"prerequisite": ["COMP1511"]},
    "COMP2511": {"prerequisite": ["COMP1531", "COMP2521"]},
    "COMP2521": {"prerequisite": ["COMP1511"]},
    "COMP3900": {"prerequisite": ["COMP1531", "COMP2521"]},
    "COMP4920": {"prerequisite": ["COMP3900"]},
    "MATH1081": {"prerequisite": []},
    "MATH1131": {"prerequisite": []},
    "MATH1231": {"prerequisite": ["MATH1131"]},
}

def preprocess_courses(courses):
    course_codes = [course['course_code'] for course in courses]
    course_mapping = {course_code: idx for idx, course_code in enumerate(course_codes)}
    course_sequences = [course_mapping[course_code] for course_code in course_codes]
    return course_sequences, course_mapping

def create_rnn_model(vocab_size, embedding_dim=32, rnn_units=64):
    model = Sequential([
        Embedding(vocab_size, embedding_dim),
        LSTM(rnn_units, return_sequences=True),
        LSTM(rnn_units),
        Dense(vocab_size, activation='softmax')
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
    return model

def train_model(model, course_sequences, epochs=100):
    X = np.array(course_sequences[:-1]).reshape((len(course_sequences) - 1, 1))
    y = np.array(course_sequences[1:])
    model.fit(X, y, epochs=epochs)

def prerequisites_met(course_code, completed_courses):
    return all(prerequisite in completed_courses for prerequisite in core_courses_prerequisites[course_code]["prerequisite"])

def generate_course_plan_with_prerequisites_and_terms(courses_data, num_courses_per_term=3):
    course_plan = {"T1": [], "T2": [], "T3": []}
    completed_courses = []

    for course in courses_data:
        course_code = course['course_code']
        terms = course['terms']

        if course_code in core_courses_prerequisites:
            if not core_courses_prerequisites[course_code]["prerequisite"] and "T1" in terms and len(course_plan["T1"]) < num_courses_per_term:
                course_plan["T1"].append(course_code)
                completed_courses.append(course_code)

    for term in ["T1", "T2", "T3"]:
        for course in courses_data:
            course_code = course['course_code']
            terms = course['terms']

            if course_code in core_courses_prerequisites and course_code not in completed_courses:
                if term in terms and prerequisites_met(course_code, completed_courses) and len(course_plan[term]) < num_courses_per_term:
                    course_plan[term].append(course_code)
                    completed_courses.append(course_code)

    return course_plan

def generate_reasoning_with_gpt(course_plan, courses_data):
    prompt = "Provide reasoning for the following course plan, focusing on building a strong foundation and progressing to advanced topics. Include how the courses fit together, and briefly mention prerequisites where relevant:\n\n"
    
    course_name_map = {course['course_code']: course['course_name'] for course in courses_data}
    prerequisites_map = {course_code: core_courses_prerequisites[course_code]["prerequisite"] for course_code in core_courses_prerequisites}

    for term, courses in course_plan.items():
        prompt += f"{term} Courses: {', '.join([course_name_map[course] for course in courses])}\n"
    
    prompt += "\nExplain why these courses are placed in each term. Focus on how they build a foundation and progress into advanced topics, and briefly mention prerequisites where applicable."

    for course, prereqs in prerequisites_map.items():
        if prereqs:
            prereq_names = ', '.join([course_name_map[prereq] for prereq in prereqs if prereq in course_name_map])
            prompt += f"{course_name_map[course]} requires {prereq_names}.\n"
        else:
            prompt += f"{course_name_map[course]} has no prerequisites.\n"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": prompt}],
        max_tokens=300
    )

    gpt_reasoning = response['choices'][0]['message']['content'].strip()

    file_path = "degree_plan_reasoning.txt"
    
    try:
        with open(file_path, "w") as file:
            file.write(gpt_reasoning)
        print(f"Response saved to {file_path}\n")
    except Exception as e:
        print(f"Failed to write to {file_path}: {e}")
    
    return gpt_reasoning

courses_data = fetch_comp_courses()
course_sequences, course_mapping = preprocess_courses(courses_data)

vocab_size = len(course_mapping)
rnn_model = create_rnn_model(vocab_size)
train_model(rnn_model, course_sequences)

course_plan = generate_course_plan_with_prerequisites_and_terms(courses_data)

print("Course Plan:")
for term, courses in course_plan.items():
    print(f"{term} Courses: {', '.join(courses)}")

gpt_reasoning = generate_reasoning_with_gpt(course_plan, courses_data)
print(gpt_reasoning)
