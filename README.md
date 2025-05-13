# 🧠 Self-Driving Car Simulation (Learning Project)

This is a browser-based self-driving car simulation that I built while learning from the excellent work of [Radu Mariescu-Istodor](https://github.com/ra1ndeer). I implemented this project independently, applying concepts from his tutorials and adding my own enhancements along the way.

The simulation showcases how a car can navigate a road using virtual sensors and a basic neural network, all rendered using JavaScript and HTML5 Canvas.

---

## 🔗 Live Project

👉 **[Click here to try the simulation](https://vageeshhegde.github.io/Self-Driving-Car/public/)** 

---

## ⚙️ How It Works (in Simple Steps)

1. When the page loads, a virtual road is drawn on the canvas.
2. A car is spawned in the center lane, controlled either by **AI** or **arrow keys**.
3. The car is equipped with **virtual sensors** (rays) that detect obstacles (road borders, traffic).
4. If AI mode is selected:
   - The car uses a simple **feedforward neural network** to make decisions based on sensor input.
   - The best-performing AI "brain" is stored and reused for future runs.
5. Traffic cars are randomly generated as **obstacles**.
6. In **Game Mode**, sound effects are played for actions like acceleration and collisions.
7. The user can toggle between **AI mode** and **manual driving** via top tabs.

---

## 🚀 Features I’ve Added

- 🚗 **Dynamic Car & Traffic Simulation**  
  Programmatically spawns self-driving and dummy traffic cars with randomized lanes and speeds, allowing multiple agents and realistic traffic behavior.

- 🔊 **Game Mode with Sound Effects**  
  Integrated sound effects for acceleration, crashes, and other interactions to make the simulation more immersive in manual control mode.

- 🎮 **Control Modes: AI & Manual Tabs**  
  Added UI tabs to switch between AI-controlled and user-controlled (arrow key) driving modes.

- 🧠 **In Progress: ML/AI Backend Integration**  
  - Using **PyTorch** for reinforcement learning logic  
  - Backend API with **Flask** to sync training and brain state  
  - Plan to save/load best-performing neural networks  
  - Logging performance stats for experimentation

---

## 🧰 Tech Stack

- HTML5 + CSS + JavaScript (Vanilla)
- HTML Canvas API for rendering
- Custom-built Neural Network (no external ML libraries)
- [Planned] PyTorch + Flask backend integration

---

## 🙏 Acknowledgements

This project is **inspired by** the amazing [Self-Driving Car Simulation](https://youtu.be/Rs_rAxEsAvI?si=0NrWuLaoEP3zEvWk) created by **[Radu Mariescu-Istodor](https://www.youtube.com/@Radu)**.  
While I’ve built the code myself, Radu’s tutorials and approach were key to understanding the core concepts. Huge thanks for making his knowledge openly available.

---
