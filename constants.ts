import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  name: "Zhilin Tang",
  contact: {
    location: "Chicago, IL",
    phone: "+1 (312) 919-9003",
    email: "tangzhilinnz@gmail.com",
    github: "github.com/tangzhilinnz",
    linkedin: "linkedin.com/in/tangzhilin"
  },
  summary: "Software Engineer with 5+ years of industry experience specializing in Real-Time Systems and GPU Programming. Deep expertise in C/C++, CUDA, Python, Triton, and GPU Shader programming. Skilled in optimizing Deep Learning algorithms and leveraging GPU architecture for maximum performance. Strong background in software design patterns, multithreading optimization, and large-scale software architecture.",
  experience: [
    {
      id: "exp-1",
      role: "C/C++ Software Engineer",
      company: "Chengdu Denglin Technology Co., Ltd",
      location: "Chengdu, China",
      date: "Jan 2021 – Aug 2024",
      points: [
        "**PyTorch Integration (System Architecture):** Spearheaded the end-to-end integration of the PyTorch ecosystem onto proprietary hardware; resolved complex compilation, linking, and ABI compatibility challenges to enable native execution of AI models, directly expanding the company’s compatible model library by 50+ models.",
        "**Kernel Optimization (Performance):** Engineered high-performance C++/CUDA implementations of Deep Learning operators (e.g., Attention, Convolution, GEMM); utilized Nsight Compute to diagnose bottlenecks and drive optimizations in memory coalescing and thread parallelism, resulting in a 60% reduction in inference latency and a 1.5x increase in training throughput.",
        "**Testing Infrastructure (Quality):** Architected a hybrid C++/Python unit test framework for CUDA-compatible libraries (cuDNN/cuBLAS APIs); automated the validation of 100+ distinct operators, reducing regression testing cycles from 2 days to 3 hours and substantially improving release stability.",
        "**Cross-Functional Debugging:** Partnered with hardware architects and compiler teams to investigate critical silicon-software interface bugs; diagnosed and patched complex root causes in the AI compiler stack, resolving major blockers that prevented the successful execution of key AI models."
      ]
    },
    {
      id: "exp-2",
      role: "Embedded Software Engineer in Test",
      company: "Wind River Software Technology",
      location: "Chengdu, China",
      date: "May 2020 – Jan 2021",
      points: [
        "**RTOS Compliance & Safety:** Validated and debugged OS-level C APIs for the VxWorks RTOS to meet stringent aviation-grade certification standards; refactored legacy code to resolve compliance violations, ensuring 100% adherence to safety and reliability requirements for mission-critical deployments.",
        "**Simulation & Verification:** Engineered comprehensive unit test suites using C and Python to verify software features; leveraged Simics for full-system hardware simulation and Wassp for coverage analysis, which accelerated the validation process and guaranteed rigorous adherence to aviation software quality standards."
      ]
    }
  ],
  research: [
    {
      id: "res-1",
      role: "Graduate Research Assistant (Efficient Transformer Neural Networks)",
      company: "DePaul University Jarvis College of Computing and Digital Media",
      location: "Chicago, IL",
      date: "Jun 2025 – Present",
      points: [
        "**Algorithmic Innovation:** Developed a novel tree-based hierarchical attention mechanism to address the quadratic bottleneck in standard Transformers; successfully reduced memory complexity to O(n) and computation to O(n log n), enabling the efficient processing of long-sequence data.",
        "**Model Implementation:** Engineered a robust prototype of the attention mechanism in PyTorch and integrated it into Transformer architectures; validated model efficacy across NLP, classification, and time-series forecasting, proving the algorithm's generalization capabilities and competitive accuracy against standard benchmarks.",
        "**HPC Acceleration:** Designed and implemented custom CUDA and Triton kernels to accelerate the hierarchical attention mechanism; conducted deep performance profiling and low-level optimization (memory coalescing, shared memory usage, kernel fusion), achieving maximal hardware utilization compared to standard PyTorch implementations.",
        "**Technical Communication:** Authored comprehensive research reports detailing algorithmic proofs, performance benchmarks, and implementation strategies; synthesized complex empirical data to support algorithmic validation and future academic publication."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "DePaul University",
      degree: "Master of Science in Software Engineering",
      location: "Chicago, IL",
      date: "Sep 2024 – Jun 2026",
      details: "GPA: 4.0/4.0 | Software Architecture, C++ Real-Time Systems, AI systems, Deep Learning, CUDA, Triton"
    },
    {
      id: "edu-2",
      school: "Chengdu University of Information Technology",
      degree: "Bachelor of Engineering in Microelectronics",
      location: "China",
      date: "Sep 2006 – Jul 2010",
      details: "Embedded Systems & RTOS, Circuit Design, Digital Signal Processing, Chip Architecture"
    }
  ],
  certification: [
    {
      id: "cert-1",
      name: "Graduate Diploma in Applied Information Technology – Software Engineering",
      institution: "Waikato Institute of Technology",
      date: "Apr 2019 – Nov 2019",
      details: "Data Structures & Algorithms, Linear Algebra, Python, C++ Object-Oriented Programming"
    }
  ],
  skills: [
    { category: "Programming Languages", items: "C, C++, C#, Python, Java, Shell" },
    { category: "Graphics APIs", items: "DirectX, OpenGL" },
    { category: "GPU Computing", items: "CUDA, Triton, Shader" },
    { category: "AI & Machine Learning", items: "PyTorch, TensorFlow" },
    { category: "Build Tools", items: "CMake, Make, Ninja, Bazel" },
    { category: "Operating Systems", items: "Windows, Linux" },
    { category: "Version Control & CI/CD", items: "Git, GitLab, Perforce, Docker, Jenkins" }
  ]
};