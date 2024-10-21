import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
// import Home from './components/Home';
import Topics from './components/Topics';
import TopicDetails from './components/TopicDetails';

function App() {
  return (
    <Router basename='/h5'>
      <div className="main-content">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Navigate to="/topics" />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:id" element={<TopicDetails />} />
        </Routes>
      </div>
      <nav className="bottom-nav">
        <NavLink to="/" end>首页</NavLink>
        <NavLink to="/topics">话题</NavLink>
      </nav>
    </Router>
  );
}

export default App;