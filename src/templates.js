export const templates = [
  {
    id: 'blank',
    name: 'Blank Document',
    code: '% Paste your LaTeX resume code here...\n\n\\documentclass{article}\n\\begin{document}\n\n\\end{document}'
  },
  {
    id: 'standard',
    name: 'Standard Professional',
    code: `\\documentclass[a4paper,10pt]{article}
\\usepackage[left=1in,right=1in,top=1in,bottom=1in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{12pt}{6pt}

\\begin{document}
\\begin{center}
    {\\Huge \\textbf{John Doe}} \\\\
    \\vspace{2mm}
    johndoe@email.com $\\cdot$ (123) 456-7890 $\\cdot$ linkedin.com/in/johndoe
\\end{center}

\\section*{Education}
\\textbf{University of Technology} \\hfill City, State \\\\
Bachelor of Science in Computer Science \\hfill May 2024 \\\\
GPA: 3.8/4.0

\\section*{Experience}
\\textbf{Tech Innovators Inc.} \\hfill City, State \\\\
\\textit{Software Engineering Intern} \\hfill Jun 2023 -- Aug 2023
\\begin{itemize}[leftmargin=*]
    \\item Developed a new feature using React and Node.js that improved user retention by 15\\%.
    \\item Collaborated with a team of 5 engineers using agile methodologies.
\\end{itemize}

\\section*{Skills}
\\textbf{Languages:} Python, Java, JavaScript, C++ \\\\
\\textbf{Technologies:} React, Node.js, Git, Docker, AWS

\\end{document}`
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\definecolor{primary}{RGB}{0, 79, 144}

\\titleformat{\\section}{\\Large\\bfseries\\color{primary}}{}{0em}{}[\\color{gray}\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}
\\begin{center}
    {\\Huge \\textbf{\\textcolor{primary}{Alex Rivera}}} \\\\[5pt]
    \\small 555-0199 \\textbullet{} alex.rivera@email.com \\textbullet{} github.com/arivera
\\end{center}

\\section*{Professional Summary}
Detail-oriented Software Developer with 3+ years of experience designing and implementing scalable web applications. Passionate about clean code and performance optimization.

\\section*{Work History}
\\textbf{Senior Developer} \\hfill 2021 -- Present \\\\
\\textit{Tech Solutions Group}
\\begin{itemize}[itemsep=2pt, parsep=0pt]
    \\item Led migration from monolithic architecture to microservices, reducing downtime by 40\\%.
    \\item Mentored 3 junior developers and established code review guidelines.
\\end{itemize}

\\section*{Education}
\\textbf{B.S. Software Engineering} \\hfill 2017 -- 2021 \\\\
\\textit{State University} \\\\
Graduated with Honors.

\\end{document}`
  }
];
