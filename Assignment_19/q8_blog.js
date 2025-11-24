// Q8 - Dynamic Blog Posts
$(document).ready(function() {
  
  // Helper function to create a new post HTML
  function createPostHTML(title, content, tags, isFeatured = false) {
    const today = new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const tagsHTML = tagsArray.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const featuredClass = isFeatured ? ' featured' : '';
    
    return `
      <div class="blog-post${featuredClass}">
        <button class="delete-btn">×</button>
        <div class="post-header">
          <div class="post-title">${title}</div>
          <div class="post-date">${today}</div>
        </div>
        <div class="post-content">${content}</div>
        <div class="post-tags">${tagsHTML}</div>
      </div>
    `;
  }
  
  // 1. "Add New Post" → append a new post to the list
  $('#addPostBtn').click(function() {
    const title = $('#postTitle').val().trim();
    const content = $('#postContent').val().trim();
    const tags = $('#postTags').val().trim();
    
    if (!title || !content) {
      alert('⚠️ Please fill in title and content');
      return;
    }
    
    const newPost = createPostHTML(title, content, tags);
    $('#postsList').append(newPost);
    
    // Clear inputs
    $('#postTitle, #postContent, #postTags').val('');
    
    // Scroll to new post
    const lastPost = $('#postsList .blog-post:last');
    $('html, body').animate({
      scrollTop: lastPost.offset().top - 100
    }, 500);
  });
  
  // 2. "Prepend Featured Post" → add a post at the top
  $('#prependPostBtn').click(function() {
    const title = $('#postTitle').val().trim();
    const content = $('#postContent').val().trim();
    const tags = $('#postTags').val().trim();
    
    if (!title || !content) {
      alert('⚠️ Please fill in title and content');
      return;
    }
    
    const featuredPost = createPostHTML(title, content, tags, true);
    $('#postsList').prepend(featuredPost);
    
    // Clear inputs
    $('#postTitle, #postContent, #postTags').val('');
    
    // Scroll to top
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
  
  // 3. "Remove Last Post" → delete last element
  $('#removeLastBtn').click(function() {
    const posts = $('#postsList .blog-post');
    
    if (posts.length === 0) {
      alert('⚠️ No posts to remove');
      return;
    }
    
    if (confirm('Remove the last post?')) {
      posts.last().fadeOut(400, function() {
        $(this).remove();
      });
    }
  });
  
  // Delete individual post using event delegation
  $('#postsList').on('click', '.delete-btn', function() {
    if (confirm('Delete this post?')) {
      $(this).closest('.blog-post').fadeOut(400, function() {
        $(this).remove();
      });
    }
  });
  
  // 4. Add tags to posts → use .before()/.after() for placement
  // Demonstrating .before() and .after() by adding author info
  $('#postsList .blog-post').each(function() {
    // Add author before post content using .before()
    $(this).find('.post-content').before(
      '<div style="font-size: 13px; color: #999; margin-bottom: 8px;">👤 By Admin</div>'
    );
    
    // Add read time after title using .after()
    $(this).find('.post-title').after(
      '<span style="font-size: 12px; color: #999; margin-left: 10px;">📖 3 min read</span>'
    );
  });
  
  // 5. Highlight posts with specific keywords dynamically
  $('#highlightKeywordsBtn').click(function() {
    // Remove previous highlights
    $('.blog-post').removeClass('highlighted');
    
    // Search for keyword "JavaScript" in content or tags
    $('#postsList .blog-post').each(function() {
      const content = $(this).find('.post-content').text().toLowerCase();
      const title = $(this).find('.post-title').text().toLowerCase();
      const tags = $(this).find('.post-tags').text().toLowerCase();
      
      if (content.includes('javascript') || title.includes('javascript') || tags.includes('javascript')) {
        $(this).addClass('highlighted');
      }
    });
    
    // Show count
    const count = $('.blog-post.highlighted').length;
    if (count > 0) {
      alert(`✨ Highlighted ${count} post(s) containing "JavaScript"`);
    } else {
      alert('⚠️ No posts found with "JavaScript"');
    }
  });
  
});
