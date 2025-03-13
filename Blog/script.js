const mongoose = require("mongoose")
const Blog = require("./models/Blog")
require("dotenv").config({path: "config/.env"})

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Blog.deleteMany({})
    const blogs = [
      {
        title: "The Future of Web Development",
        body: "Web development is evolving rapidly with new frameworks, libraries, and architectures reshaping the landscape. From serverless architectures to AI-powered tools, developers must stay adaptable and continuously learn to keep up. The future promises more seamless integrations, better user experiences, and even more intuitive development environments.",
        author: "John Doe",
        date: new Date("2024-01-15T10:30:00Z"),
        comments: [
          {
            user: "Jane Smith",
            comment: "Great insights! I’m particularly excited about AI-assisted coding. It’s already boosting my productivity!",
            date: new Date("2024-01-16T08:15:00Z"),
            likes: 10,
            replies: [
              {
                user: "DevGuy",
                reply: "AI coding tools are a game-changer! Have you tried GitHub Copilot or Tabnine?",
                likes: 5,
                date: new Date("2024-01-16T09:00:00Z")
              },
              {
                user: "CodeMaster",
                reply: "I think AI will eventually write full apps. What do you think?",
                likes: 3,
                date: new Date("2024-01-17T12:30:00Z")
              }
            ]
          },
          {
            user: "Sam Developer",
            comment: "Serverless tech is fascinating! I’ve been experimenting with AWS Lambda, and it’s amazing how it simplifies infrastructure management.",
            date: new Date("2024-01-18T14:45:00Z"),
            likes: 8,
            replies: [
              {
                user: "CloudGuru",
                reply: "Yes! Lambda plus API Gateway makes deploying apps super fast.",
                likes: 4,
                date: new Date("2024-01-19T10:00:00Z")
              }
            ]
          }
        ]
      },
      {
        title: "Understanding JavaScript Closures",
        body: "Closures are a powerful concept in JavaScript. They allow functions to 'remember' the environment in which they were created. This is essential for creating private variables, callbacks, and more complex patterns like currying. Mastering closures opens up new possibilities for writing more efficient and flexible code.",
        author: "Emily Clark",
        date: new Date("2023-11-22T14:00:00Z"),
        comments: [
          {
            user: "Alex Coder",
            comment: "This finally made closures click for me! I never understood why people said they were so important until now.",
            date: new Date("2023-11-23T09:00:00Z"),
            likes: 12,
            replies: [
              {
                user: "JSFanatic",
                reply: "Closures are everywhere! Try using them in event handlers, you’ll see their true power.",
                likes: 6,
                date: new Date("2023-11-24T11:15:00Z")
              }
            ]
          }
        ]
      },
      {
        title: "CSS Grid vs Flexbox: Which One Should You Use?",
        body: "CSS Grid and Flexbox are both essential tools for modern web layouts. Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional alignment. Understanding when to use each one helps you build responsive, maintainable designs that look great across devices.",
        author: "Chris Martin",
        date: new Date("2024-02-10T09:45:00Z"),
        comments: [
          {
            user: "Sarah Lee",
            comment: "I used to struggle with layouts until I learned Grid and Flexbox. Now I mix them both in my projects!",
            date: new Date("2024-02-11T11:30:00Z"),
            likes: 9,
            replies: [
              {
                user: "LayoutWizard",
                reply: "Same here! Grid for the big picture, Flexbox for fine-tuning. Perfect combo.",
                likes: 4,
                date: new Date("2024-02-12T08:00:00Z")
              }
            ]
          }
        ]
      }
    ]   
    await Blog.insertMany(blogs)
    await mongoose.disconnect()
  })
  .catch(err => {
    console.log(err)
  })