import requests

API_URL = "https://graphql.csesoc.app/v1/graphql"

def fetch_comp_courses():
    query = """
    query {
       courses(where: {_or: [{course_code: {_like: "COMP%"}}]}) {
        course_code
        course_name
      }
    }
    """
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, json={"query": query}, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data['data']['courses']
    else:
        raise Exception(f"Query failed: {response.status_code} - {response.text}")

def print_course_names():
    courses = fetch_comp_courses()

    # Print all COMP course names, each on a new line
    for course in courses:
        print(course['course_code'])

if __name__ == "__main__":
    print_course_names()
