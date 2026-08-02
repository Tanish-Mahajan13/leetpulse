USER :
    name
    email
    pass
    createdAt




PROBLEMS :
    user_id (ObjectId referencing User, required)
    title (String, required)
    url (String, required)
    difficulty (String: 'Easy', 'Medium', 'Hard')
    code (String, required)
    comment (String, default: '')
    revision_count (Number, default: 1)
    last_revised_at (Date, default: Date.now)
    next_revision_date (Date, required) 