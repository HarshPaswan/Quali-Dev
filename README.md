# HackUTD 2023 - Fannie Mae 
# Inspiration
As immigrants, our parents struggled to buy their first home. The prompt caught our eye as we perused through the many companies. We decided to tackle Fannie Mae's prompt. We were also interested in creating a project that adopted next.js and this was the perfect prompt for the task.

# What it does
The project asks for client inputs, consisting of credit, loans, income, and similar financial involvements. The inputs are then processed through numerous calculations which deal with quantities such as LTV, and DTI allowing for a more precise analysis of the homeowner's eligibility. After this analysis, the client is shown whether they are eligible and this output is then compiled with the specific calculations into a email which is given to the client. The client (through the website itself) is given an opportunity to use sliders and input different values (from their real values) for the economic factors and they can see what changes they should make to such factors to become eligible. The final email also consists of articles.

# How we built it
We initially used python to create a preliminary calculation of markets trends on pre-existing data generously provided to us by the prompt's sponsor. This script allowed us to create a sequence diagram that plotted the various stages we would have to implement to reach the final web development. To continue, we used next.js which essentially fused with our use of react, postgressSQL, material UI (used by Google), tailwind css, and Prisma as an ORM. Multiple .tsx files were used to create various pages and features for the web app and we internally implemented the math foundation for the eligibility.

# Challenges we ran into
As inexperienced programmers in consideration of the fact that we had never applied next.js or react in a project, creating a full web application proved to be a journey riddled with challenges. The first challenge was attempting to create a working database connection with react to ensure full save for inputted data that could be accessed by disconnected pages. However, we were able to successfully create a working database that smoothly connected with our program and allows for new users to be freely added as soon as they completed the entire input process. Of course, the hurdles didn't stop there as we soon arrived at a new issue which was fetching database data and connecting it to the sliders where the client could provide artificial values to check what they need to change to become eligible for owning a home.

# Accomplishments that we're proud of
The biggest accomplishment we are proud of is being able to produce such a beautiful application in the span of 24 hours and being able to learn new skills and apply those skills. Through this hackathon and prompt, we were able to gain a comprehensive understanding of how next.js can be used to create a powerful web application allowing for clients to have a smooth interaction with multiple processes at the same time.

# What we learned
We learned that it isn't easy to create an excellent and perfect project in 24 hours but with dedication we can create a great project that fully adheres to client criteria while also providing a great user experience. In terms of technical skills, we learned react, PostgreSQL, JavaScript, material UI , tailwind CSS, and Prisma.

# What's next for Quali
We hope to create a more interactive, aesthetic, and more robust application that promotes input validation and a stronger integration with Fannie Mae services. We hope that clients have a great time using our app while also leaving the site fulfilled and with new knowledge that will help them become a homeowner in no time.
