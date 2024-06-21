import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Form,
  Button,
  Input,
  Divider,
  Tooltip,
  Popconfirm,
  message,
  Image,
  Typography,
  Space,
} from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  DislikeFilled,
  LikeOutlined,
  LikeFilled,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const PostDetailPage = () => {
  const { postId } = useParams();

  const [post] = useState({
    id: parseInt(postId),
    title: "Tiêu đề bài viết",
    content:
      "Đây là nội dung của một bài viết mẫu. Bạn có thể thay thế bằng nội dung thực tế của bạn.",
    author: "Admin",
    createdAt: new Date("2023-06-17"),
    imageUrl: "https://via.placeholder.com/800x400",
    comments: [
      {
        id: 1,
        author: "Alice",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
        content: "Bài viết rất hay!",
        datetime: moment().subtract(1, "days").fromNow(),
        likes: 10,
        dislikes: 2,
        visible: true,
        parentId: null,
      },
      {
        id: 2,
        author: "Bob",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
        content: "Tôi không đồng ý với quan điểm này.",
        datetime: moment().subtract(2, "hours").fromNow(),
        likes: 5,
        dislikes: 8,
        visible: true,
        parentId: null,
      },
      {
        id: 3,
        author: "Carol",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
        content: "Tôi đồng ý với Alice!",
        datetime: moment().subtract(1, "hour").fromNow(),
        likes: 3,
        dislikes: 1,
        visible: true,
        parentId: 1,
      },
    ],
  });

  const [comments, setComments] = useState(post?.comments || []);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "User",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: value,
          datetime: moment().fromNow(),
          likes: 0,
          dislikes: 0,
          visible: true,
          parentId: null,
        },
      ]);
      message.success("Bình luận đã được thêm!");
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleDislike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment
      )
    );
  };

  const handleHideComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, visible: false } : comment
      )
    );
  };

  const renderComment = (comment, depth = 0) => {
    const replies = comments.filter((c) => c.parentId === comment.id);

    return (
      <div key={comment.id} style={{ marginLeft: depth * 32 }}>
        <div
          style={{ display: "flex", alignItems: "flex-start", marginBottom: 8 }}
        >
          <Avatar src={comment.avatar} />
          <div style={{ marginLeft: 16 }}>
            <Space direction="vertical">
              <Text strong>{comment.author}</Text>
              <Paragraph>{comment.content}</Paragraph>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {comment.datetime}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Tooltip title="Like">
                  <span
                    onClick={() => handleLike(comment.id)}
                    style={{ cursor: "pointer", marginRight: 16 }}
                  >
                    {comment.likes > 0 ? <LikeFilled /> : <LikeOutlined />}
                    <span style={{ paddingLeft: 8 }}>{comment.likes}</span>
                  </span>
                </Tooltip>
                <Tooltip title="Dislike">
                  <span
                    onClick={() => handleDislike(comment.id)}
                    style={{ cursor: "pointer", marginRight: 16 }}
                  >
                    {comment.dislikes > 0 ? (
                      <DislikeFilled />
                    ) : (
                      <DislikeOutlined />
                    )}
                    <span style={{ paddingLeft: 8 }}>{comment.dislikes}</span>
                  </span>
                </Tooltip>
                <Popconfirm
                  title="Bạn có chắc chắn muốn ẩn bình luận này?"
                  onConfirm={() => handleHideComment(comment.id)}
                  okText="Ẩn"
                  cancelText="Hủy"
                >
                  <Button type="link">Ẩn</Button>
                </Popconfirm>
              </div>
            </Space>
          </div>
        </div>
        {replies.map((reply) => renderComment(reply, depth + 1))}
      </div>
    );
  };

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <Title level={2}>{post?.title}</Title>
      <Paragraph>
        Tác giả: {post?.author} | Ngày đăng:{" "}
        {moment(post?.createdAt).format("DD/MM/YYYY")} | Lượt bình luận:{" "}
        {comments.length}
      </Paragraph>
      <Image
        width="100%"
        src={post.imageUrl}
        alt="Post Image"
        style={{ marginBottom: 16 }}
      />
      <Paragraph>{post?.content}</Paragraph>

      <Divider />

      <div id="comments">
        <Title level={3}>Bình luận</Title>
        <div>
          {comments
            .filter((comment) => comment.parentId === null && comment.visible)
            .map((comment) => renderComment(comment))}
        </div>

        <div
          style={{ display: "flex", alignItems: "flex-start", marginTop: 16 }}
        >
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="User Avatar" />
          <div style={{ flex: 1, marginLeft: 16 }}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                onChange={handleChange}
                value={value}
                placeholder="Viết bình luận của bạn..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
                type="primary"
              >
                Thêm bình luận
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
