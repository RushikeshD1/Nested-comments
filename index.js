
const replyBtn = document.querySelector('.reply');

function createChatLine(isReply = false, parentChatline = null) {
    const chatline = document.createElement('div');
    chatline.classList.add('chatline');
    if (isReply) chatline.classList.add('reply-section');
    
    chatline.innerHTML = `
        <input type='text' class='input' placeholder='Enter name'>
        <input type='text' class='details' placeholder='Enter message'>
        <div class='button'>
            <button class="cancel">Cancel</button>
            <button class="post">Post</button>
        </div>
    `;
    
    if (parentChatline) {
        parentChatline.appendChild(chatline);  
    } else {
        document.querySelector('.relychat').appendChild(chatline);
    }

    const postBtn = chatline.querySelector('.post');
    const cancelBtn = chatline.querySelector('.cancel');
    const input = chatline.querySelector('.input');
    const details = chatline.querySelector('.details');
    const button = chatline.querySelector('.button');

    postBtn.addEventListener('click', () => {
        const name = input.value;
        const message = details.value;
        
        if (name && message) {
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            h1.innerText = name;
            p.innerText = message;

            chatline.replaceChild(h1, input);
            chatline.replaceChild(p, details);
            
            button.innerHTML = `
                <button class="reply">Reply</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
           
            handleCommentButtons(chatline, h1, p, button);
        }
    });

    cancelBtn.addEventListener('click', () => {
        chatline.style.display = 'none';  
    });

    return chatline;
}

function handleCommentButtons(chatline, h1, p, button) {
    const replyBtn = button.querySelector('.reply');
    const editBtn = button.querySelector('.edit');
    const deleteBtn = button.querySelector('.delete');
    
    replyBtn.addEventListener('click', () => {
        createChatLine(true, chatline);  
    });

    editBtn.addEventListener('click', () => {
        const detailsInput = chatline.querySelector('.details');
        detailsInput.value = p.innerText;  
        chatline.replaceChild(detailsInput, p);
        
        button.innerHTML = `
            <button class="cancel">Cancel</button>
            <button class="post">Post</button>
        `;
       
        const postBtn = button.querySelector('.post');
        postBtn.addEventListener('click', () => {
            const updatedContent = detailsInput.value;
            if (updatedContent.trim()) {
                p.innerText = updatedContent;
                chatline.replaceChild(p, detailsInput);

                button.innerHTML = `
                    <button class="reply">Reply</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                `;
                handleCommentButtons(chatline, h1, p, button);
            }
        });
    });

    deleteBtn.addEventListener('click', () => {
        chatline.remove(); 
    });
}

replyBtn.addEventListener('click', () => {
    console.log("Reply clicked");
    createChatLine(); 
});

