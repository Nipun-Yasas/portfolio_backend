const express = require('express');
const app = express();
const port = 5000;

// this is the entry point

require('dotenv').config();
const Project = require('./Project');
const Blog = require('./Blog');

const cors = require('cors');
app.use(cors());

//parse json data

app.use(express.json());   

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create a endpoint for creating a project

app.post("/projects", async (req, res) => {
    const project = new Project(req.body);
  
    try {
      const newProject = await project.save();
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});
  
//create a endpoint for updating a project by id

app.patch("/projects/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        project.set(req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//create a endpoint for delete a project by id

app.delete("/projects/:id", async (req, res) => {
    try {
      const result = await Project.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create a endpoint for creating a blog

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create a endpoint for updating a blog by id

app.patch("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.set(req.body);
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create a endpoint for delete a blog by id

app.delete("/blogs/:id", async (req, res) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: "Blog deleted" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

