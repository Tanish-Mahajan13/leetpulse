# summary
    dsa tracker that tracks solved leetcode problems using extension
    saves the data like ques url , title , code , difficulty

    on the appliation itself there would be a login page
    the appliation must detect if the extension is installed otherwise ask to install that
    there would be a page showing all the questions solved from recent to oldest
        this would also allow users to search ques by title , date , difficulty 
    then the revision dashboard will show todays ques that needs to be revised based on the system we will make
    it shall also show the upcoming days revision plans and ig previous too

-----------
Project Name: [leetpulse]
A multi-tier engineering tool designed to automate DSA interview preparation via cross-environment synchronization and memory retention tracking.

🧱 System Components
Manifest V3 Chrome Extension: Injects into the LeetCode DOM environment to automatically scrape problem titles, URLs, difficulty levels, and accepted code snippets upon successful submission. Features a micro-modal for saving contextual runtime study notes.

MERN Backend API: A containerized Express/Node application backed by MongoDB. Handles JWT user authentication, serves metadata search/filtering queries, and runs a Leitner-based algorithmic interval calculation for spaced repetition tracking.

React Analytics Client: A dashboard providing user authentication, extension presence verification, a query-searchable master index of solved problems, and a dynamic "Due for Review" priority queue.

Docker Multi-Container Environment: A unified development setup linking isolated frontend, backend, and local database services via a single compose file.