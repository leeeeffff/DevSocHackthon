# DevSocHackathon

##Inspiration
+ The idea for Pathways emerged from the challenges that many UNSW Computer Science students face when navigating their academic journey. Students must sift through a plethora of resources, such as the UNSW Handbook, which contains hundreds of courses, each with its own prerequisites and eligibility criteria. This often leads to confusion and frustration, especially when trying to determine the best path forward that aligns with their interests, academic goals, and degree requirements. Students often spend considerable time trying to find the right courses and build a coherent plan. This situation inspired the development of Pathways—a solution designed to simplify the academic planning process.
+ We wanted to create a tool that would streamline decision-making for students, providing them with clear, personalised course recommendations without the hassle of manually going through all the available information scattered across UNSW websites (progression plans, checklists, the handbook). 
+ The goal was to allow students to focus more on their academic goals and personal development, rather than getting bogged down by administrative complexity. Pathways was built with the student experience at its core, offering a user-friendly and intelligent way to help them make more informed decisions while saving valuable time in the process.

##What it Does
+ Acting as a personal academic advisor, Pathways considers your academic history, interests, career goals, and degree requirements to offer tailored course suggestions.
+ Log In: Access Pathways through the UNSW portal using your credentials.
+ Provide Input: Enter your completed courses, grades, degree program, and any career or interest preferences.
+ AI Analysis: Pathways analyses your academic history, prerequisites, and future opportunities to generate recommendations.
+ Receive Recommendations: Get a list of courses tailored to your core requirements, electives, and areas of interest.
+ Review Courses: Check course details like prerequisites, degree relevance, and potential career benefits.
+ Track Progress: Ensure you're meeting graduation requirements and explore personalised pathways.
+ Plan Your Semester: Finalise course selections and export or share them with an advisor.
Pathways simplifies course selection by providing AI-driven recommendations tailored to your academic progress and future aspirations, ensuring you stay on track while exploring new interests


##How We Built It
+ For the frontend, we used React to build an intuitive and responsive user interface, making the platform easy to navigate for students. React’s component-based architecture allowed us to create a dynamic user experience, enabling real-time updates and interactions as students explore their options. 
+ On the backend, we employed Node.js, which facilitated the development of a fast, scalable, and responsive platform capable of handling large datasets and API integrations. 
+ At the core of Pathways is an AI model trained on the UNSW Computer Science curriculum and anonymised student data. This model powers the course recommendation engine by learning from a variety of student profiles and academic histories. We designed the AI model to understand course prerequisites, corequisites, and elective structures, enabling it to offer highly relevant suggestions tailored to each student. 
+ The PostgreSQL database securely stores all course-related data and user profiles, ensuring data integrity and allowing for efficient retrieval when the AI engine generates recommendations.
+ We also integrated several APIs to gather real-time course data from UNSW’s databases, keeping the platform up-to-date with the latest course offerings, changes in requirements, and other academic updates. By combining these technologies, we successfully built a robust system that can process large amounts of data in real time while maintaining a responsive user experience.


##Challenges We Ran Into
+ One of the primary challenges we encountered during the development of Pathways was training the AI model to provide accurate course recommendations for a diverse range of student profiles. The AI had to account for varying academic backgrounds, interests, and future goals, while also adhering to the structural complexity of the UNSW curriculum. Since the curriculum includes numerous prerequisites, co-requisites, and degree-specific rules, we had to ensure that the AI could navigate these nuances effectively to provide valid suggestions for each user.
+ Another major challenge was integrating multiple APIs to access real-time course data. We needed to ensure that the data fetched from external systems, such as UNSW's course databases, was accurate and up-to-date. This presented difficulties related to data synchronisation, especially when course availability or requirements changed mid-semester. Furthermore, as the platform grows, handling the large volume of data and ensuring a smooth, responsive user experience was another hurdle. Managing this amount of data without compromising on performance required careful optimisation of both the front-end and back-end systems.


##Accomplishments That We’re Proud Of
+ We are particularly proud of the functionality and accuracy of our AI-driven course recommendation system. Developing an AI model capable of understanding the complexities of an academic curriculum and individual student needs was no small feat. The AI is not only able to recommend relevant courses but also to anticipate future prerequisites and suggest pathways that align with the student's long-term academic goals.
+ Additionally, we take pride in the user-friendly interface we created using React. We wanted to ensure that students could easily interact with the platform and quickly access the information they need without feeling overwhelmed. The sleek design and intuitive navigation mean that even students who are not tech-savvy can use Pathways without difficulty. The platform is responsive, reliable, and simplifies what is often considered a complex and time-consuming task—planning an academic schedule.
+ Moreover, building a secure system that effectively handles sensitive academic data while maintaining high levels of performance is another accomplishment we're proud of. Pathways is designed with data privacy in mind, ensuring that student information is stored and processed securely.

##What We Learned
+ Throughout the development of Pathways, we gained a deep understanding of AI-driven recommendation systems, particularly within the educational domain. We learned how to train a model to interpret complex data sets, such as academic requirements and student profiles, and provide actionable insights based on that data. This process also highlighted the importance of continuous learning and improvement for the AI system. As more students use the platform, the AI model becomes better at predicting and suggesting the most suitable courses. 
+ In addition to the technical lessons, we learned the importance of user experience in building a tool that is not only functional but also enjoyable to use. Our goal was to create a platform that students would actively want to use, not just something they needed to use. We tried to balance detailed, accurate recommendations with an easy-to-navigate interface. Making sure that Pathways felt approachable, especially for first-year students who may be overwhelmed by their options, was key.


##What’s Next for Pathways
+ Looking forward, we aim to expand Pathways to cater to more faculties and degree programs beyond Computer Science. By incorporating other faculties, we can make Pathways a university-wide platform, benefiting a much larger student population. The ultimate goal is for Pathways to become a central tool for all UNSW students, regardless of their degree or major.
+ We also plan to continuously improve our AI algorithms by incorporating more data, such as student feedback on courses and historical trends related to course performance. In the future, we hope to introduce additional features, like the ability to suggest study groups based on student schedules or course difficulty ratings derived from previous student feedback. This would make Pathways not just a course planner but a holistic academic assistant, helping students navigate their entire academic journey from enrollment to graduation.
