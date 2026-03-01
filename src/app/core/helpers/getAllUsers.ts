export default function getAllUsers(data: any): any[] {

  let users: any[] = [];

  if (!data) return users;

  // ✅ currentUser
  if (data.currentUser) {
    users.push({
      id: data.currentUser.id,
      username: data.currentUser.username,
      image: data.currentUser.image
    });
  }

  // ✅ Loop comments
  if (Array.isArray(data.comments)) {

    data.comments.forEach((comment: any) => {

      if (comment?.user) {
        users.push({
          id: comment.user.id,
          username: comment.user.username,
          image: comment.user.image
        });
      }

      // ✅ Loop replies (1-level nesting only)
      if (Array.isArray(comment?.replies)) {

        comment.replies.forEach((reply: any) => {

          if (reply?.user) {
            users.push({
              id: reply.user.id,
              username: reply.user.username,
              image: reply.user.image
            });
          }

        });

      }

    });
  }

  return users;
}