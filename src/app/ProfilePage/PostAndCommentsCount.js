import React from 'react'
import { Label, Container } from 'semantic-ui-react'

const PostAndCommentsCount = (props) => (
    <Container id ='postAndCommentsCount'>

      <Label> Posts
      <Label.Detail>{props.user.postsCount}
     </Label.Detail>
      </Label>

      <Label> Comments
      <Label.Detail>{props.user.commentsCount}
     </Label.Detail>
     </Label>
  </Container>
)

export default PostAndCommentsCount 