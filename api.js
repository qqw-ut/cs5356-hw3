document.getElementById("comment-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // 阻止默认提交行为

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const body = document.getElementById("comment").value;

    // 构造留言对象
    const newComment = {
        postId: 1,
        name: name,
        email: email,
        body: body
    };

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment)
        });

        const data = await response.json();
        console.log("New comment submitted:", data);

        // 立即显示新留言（不等待 API 响应）
        addCommentToList(newComment, true); 

        // 清空输入框
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("comment").value = "";
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
});

// 获取 API 留言（但初始页面不显示任何留言）
async function loadComments() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=5");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const comments = await response.json();
        console.log("Fetched Comments:", comments);

        // **移除这行代码**，让初始页面是空的：
        // document.getElementById("comments-list").innerHTML = "";

        // 只在用户输入后才显示留言
        comments.forEach(comment => addCommentToList(comment, false));

    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

// 添加留言到网页
function addCommentToList(comment, isUserInput) {
    const commentList = document.getElementById("comments-list");
    
    // 如果是用户输入的留言，插入到最前面
    const li = document.createElement("li");
    li.innerHTML = `<strong>${comment.name}</strong> (${comment.email}): <br>${comment.body}`;
    
    if (isUserInput) {
        commentList.prepend(li); // 用户留言显示在最前面
    } else {
        commentList.appendChild(li); // API 留言显示在后面
    }
}

// **不自动加载 API 留言**
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("comments-list").innerHTML = ""; // 初始页面不显示留言
});
