const API_URL = "http://localhost:5000/api/photos/comments";

// POST new comment
const addComment = async (comment, token) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    const addedComment = await response.json();
    return addedComment;
  }
};

// GET all comments
const getComments = async (id) => {
  const response = await fetch(`http://localhost:5000/api/photos/${id}/comments`);

  if (response.status === 200) {
    const comments = await response.json();
    console.log(comments);
    return comments;
  }
};

const commentService = {
  addComment,
  getComments
};

export default commentService;
