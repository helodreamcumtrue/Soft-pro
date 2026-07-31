import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Activity, Image as ImageIcon, Users, Folder, 
  LogOut, CheckCircle2, Circle, Trash2, UploadCloud, FileText, 
  Download, Plus, GitCommit, GraduationCap, Settings, ArrowRight, 
  ExternalLink, GitPullRequest, Zap, User, FileSpreadsheet, File,
  Search, Bell, Check, ChevronRight, Menu, X, FileIcon
} from 'lucide-react';

const useGoogleFont = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
};

const timelineData = [
  { id: 'v0.1', title: 'Ideation & Prototyping', date: 'Jan 2024', status: 'completed', description: 'Initial concept wireframes and professor approval.' },
  { id: 'v0.2', title: 'Private Alpha', date: 'Mar 2024', status: 'completed', description: 'Core database and backend API infrastructure.' },
  { id: 'v0.3', title: 'Public Beta', date: 'May 2024', status: 'active', description: 'Frontend UI implementation and integration testing.' },
  { id: 'v1.0', title: 'Final Release', date: 'Coming Soon', status: 'upcoming', description: 'Documentation, bug fixes, and final submission.' },
];

const moodboardImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', title: 'Team Collaboration' },
  { id: 2, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', title: 'Ideation Phase' },
  { id: 3, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', title: 'System Architecture' },
  { id: 4, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', title: 'User Testing' },
  { id: 5, src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800', title: 'Final Presentation' },
  { id: 6, src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800', title: 'Brainstorming' },
];

const teamMembers = [
  { id: 1, name: 'Leila Bennett', role: 'Frontend Lead', handle: '@leila124', time: '12m ago', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', bg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'David Kim', role: 'Backend Dev', handle: '@davidk_dev', time: '1h ago', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', bg: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Sofia Rodriguez', role: 'UI/UX Designer', handle: '@sofia_designs', time: '2h ago', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf08c?auto=format&fit=crop&q=80&w=400', bg: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Marcus Chen', role: 'Project Manager', handle: '@marcus_c', time: '5h ago', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', bg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800' },
];

const initialTeamTodos = [
  { id: 1, name: 'Leila Bennett', role: 'Frontend', tasks: [{ id: 't1', text: 'Implement Drag & Drop', done: true }, { id: 't2', text: 'Refine Dashboard UI', done: false }] },
  { id: 2, name: 'David Kim', role: 'Backend', tasks: [{ id: 't3', text: 'Setup MongoDB Schema', done: true }, { id: 't4', text: 'JWT Auth Endpoints', done: true }] },
  { id: 3, name: 'Sofia Rodriguez', role: 'Design', tasks: [{ id: 't5', text: 'Finalize Moodboard', done: false }] },
  { id: 4, name: 'Marcus Chen', role: 'Management', tasks: [{ id: 't6', text: 'Review Sprint 2', done: false }, { id: 't7', text: 'Update Gantt Chart', done: true }] }
];

const documentsList = [
  { id: 'doc1', name: 'Project_Proposal_Final.pdf', type: 'pdf', date: 'Oct 24, 2024', author: 'Marcus Chen', size: '2.4 MB' },
  { id: 'doc2', name: 'Q3_Project_Roadmap.xlsx', type: 'sheet', date: 'Yesterday, 04:15 PM', author: 'Leila Bennett', size: '1.1 MB' },
  { id: 'doc3', name: 'System_Architecture_v2.docx', type: 'doc', date: 'Oct 12, 2024', author: 'David Kim', size: '845 KB' },
  { id: 'doc4', name: 'User_Testing_Results.pdf', type: 'pdf', date: 'Oct 10, 2024', author: 'Sofia Rodriguez', size: '4.2 MB' },
];

const versionHistoryData = [
  { id: 'v0.3.1', date: 'Oct 24, 2024', author: 'Leila Bennett', title: 'Beta Release Patch', description: 'Fixed navigation bugs, refined moodboard UI, and optimized image loading times.', type: 'patch', status: 'deployed' },
  { id: 'v0.3.0', date: 'Oct 20, 2024', author: 'David Kim', title: 'Public Beta Release', description: 'Deployed core features including Dashboard, interactive Timeline, and initial Professor Review module.', type: 'minor', status: 'deployed' },
  { id: 'v0.2.0', date: 'Sep 15, 2024', author: 'Sofia Rodriguez', title: 'Private Alpha', description: 'Initial testing phase with core team. Basic routing and static pages established.', type: 'major', status: 'archived' },
];

const rubricCriteria = [
  { id: 'ui', label: 'UI/UX Design', maxScore: 25 },
  { id: 'arch', label: 'System Architecture', maxScore: 25 },
  { id: 'code', label: 'Code Quality', maxScore: 25 },
  { id: 'pres', label: 'Presentation & Docs', maxScore: 25 },
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-900 p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Application Error</h2>
          <p className="text-gray-500 mb-6">A component failed to render properly.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium">Reload Workspace</button>
        </div>
      );
    }
    return this.props.children; 
  }
}

function LandingView({ onEnter }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-gray-900 overflow-y-auto selection:bg-black selection:text-white">
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-black rounded flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-[10px] tracking-wider">TP</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight">TeamPortal</span>
          </div>
          <button onClick={onEnter} className="bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm">
            Enter Workspace <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="flex justify-center mb-8">
            <span className="px-3 py-1 rounded-full border border-gray-200 bg-white text-[11px] font-medium text-gray-600 tracking-wide shadow-sm">
              Introducing v0.3.1 Beta
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 text-gray-900">
            The standard for <br className="hidden md:block" /> project collaboration.
          </h1>
          <p className="text-[15px] text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage milestones, synchronize deliverables, and submit academic projects to your professor within a single, structurally unified workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={onEnter} className="w-full sm:w-auto bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-all shadow-sm">
              Open Dashboard
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-all shadow-sm">
              Read Documentation
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function DashboardView() {
  const [todos, setTodos] = useState(initialTeamTodos);
  const [newTaskTexts, setNewTaskTexts] = useState({});

  const toggleTask = (memberId, taskId) => {
    setTodos(prev => prev.map(m => 
      m.id === memberId ? { ...m, tasks: m.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) } : m
    ));
  };

  const deleteTask = (memberId, taskId) => {
    setTodos(prev => prev.map(m => 
      m.id === memberId ? { ...m, tasks: m.tasks.filter(t => t.id !== taskId) } : m
    ));
  };

  const addTask = (memberId) => {
    const text = newTaskTexts[memberId];
    if (!text || text.trim() === '') return;
    const newTask = { id: Date.now().toString(), text: text.trim(), done: false };
    setTodos(prev => prev.map(m => m.id === memberId ? { ...m, tasks: [...m.tasks, newTask] } : m));
    setNewTaskTexts(prev => ({ ...prev, [memberId]: '' }));
  };

  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-[13px] text-gray-500 mt-1">Overview of your team's progress and immediate action items.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white border border-gray-200 rounded-md text-gray-600 hover:text-gray-900 shadow-sm transition-all">
              <Bell size={16} />
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-800 transition-all shadow-sm">
              <Plus size={14} /> New Project
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
            <div className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-2">Status</div>
            <div className="text-xl font-semibold text-gray-900 tracking-tight">On Track</div>
            <div className="mt-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 inline-block px-2 py-0.5 rounded-sm border border-emerald-200">Public Beta</div>
          </div>
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
            <div className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-2">Progress</div>
            <div className="text-xl font-semibold text-gray-900 tracking-tight">75%</div>
            <div className="w-full bg-gray-100 rounded-full h-1 mt-3">
              <div className="bg-black h-1 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
            <div className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-2">Tasks Done</div>
            <div className="text-xl font-semibold text-gray-900 tracking-tight">24 <span className="text-gray-400 text-base font-normal">/ 32</span></div>
            <div className="mt-2 text-[11px] text-gray-500">8 remaining this sprint</div>
          </div>
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
            <div className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-2">Deadline</div>
            <div className="text-xl font-semibold text-gray-900 tracking-tight">Oct 30</div>
            <div className="mt-2 text-[11px] font-medium text-amber-700 bg-amber-50 inline-block px-2 py-0.5 rounded-sm border border-amber-200">6 Days Left</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">Team Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todos.map((member) => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-[13px] font-semibold text-gray-900">{member.name}</h3>
                      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{member.role}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 flex-1 min-h-[140px]">
                    <AnimatePresence>
                      {member.tasks.length === 0 && (
                        <div className="text-[13px] text-gray-400 italic">No tasks assigned.</div>
                      )}
                      {member.tasks.map(task => (
                        <motion.div 
                          key={task.id} 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          className="flex items-start gap-3 group"
                        >
                          <button onClick={() => toggleTask(member.id, task.id)} className="mt-0.5 text-gray-300 hover:text-black transition-colors focus:outline-none">
                            {task.done ? <CheckCircle2 size={15} className="text-black" /> : <Circle size={15} />}
                          </button>
                          <span className={`text-[13px] leading-tight flex-1 transition-all ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {task.text}
                          </span>
                          <button onClick={() => deleteTask(member.id, task.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-opacity focus:outline-none">
                            <Trash2 size={13} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a task..." 
                      className="flex-1 text-[13px] bg-transparent border-none px-1 outline-none text-gray-700 placeholder:text-gray-400"
                      value={newTaskTexts[member.id] || ''}
                      onChange={(e) => setNewTaskTexts(prev => ({ ...prev, [member.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && addTask(member.id)}
                    />
                    <button onClick={() => addTask(member.id)} className="p-1 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full">
              <h2 className="text-[13px] font-semibold text-gray-900 mb-6 uppercase tracking-wider">Activity Log</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-[1px] before:bg-gray-200">
                
                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm z-10 mt-0.5">
                    <GitCommit size={10} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-gray-900 text-[13px]">Leila B.</span>
                      <span className="text-[11px] text-gray-400">10m ago</span>
                    </div>
                    <p className="text-[13px] text-gray-600">Pushed commit to <span className="font-medium text-gray-900">main</span></p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm z-10 mt-0.5">
                    <Check size={10} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-gray-900 text-[13px]">David K.</span>
                      <span className="text-[11px] text-gray-400">2h ago</span>
                    </div>
                    <p className="text-[13px] text-gray-600">Completed task <span className="font-medium text-gray-900">"JWT Auth"</span></p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm z-10 mt-0.5">
                    <UploadCloud size={10} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-gray-900 text-[13px]">Marcus C.</span>
                      <span className="text-[11px] text-gray-400">1d ago</span>
                    </div>
                    <p className="text-[13px] text-gray-600">Uploaded <span className="font-medium text-gray-900">Proposal.pdf</span></p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapView() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col overflow-hidden relative">
      <div className="absolute top-10 left-10 z-20">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Roadmap</h1>
        <p className="text-gray-400 text-[13px] max-w-xs">
          The milestones that brought us here, and what's next. Scroll down to explore.
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden relative z-10 w-full h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{ __html: '::-webkit-scrollbar { display: none; }' }} />
        <div className="w-[150vw] h-full relative flex items-center">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.path 
              d="M0,400 Q400,200 800,400 T1600,400 T2400,400 T3200,400" 
              fill="none" stroke="#222" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.path 
              d="M0,400 Q400,200 800,400 T1600,400" 
              fill="none" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </svg>

          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (index * 0.15), duration: 0.4 }}
              className="absolute flex flex-col items-center"
              style={{ left: `${(index * 25) + 20}vw`, top: index % 2 === 0 ? '250px' : '450px' }}
            >
              <div className="mb-4 text-center">
                <span className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase border border-gray-800 px-2 py-0.5 rounded-full">{item.id}</span>
                <h3 className={`text-[15px] font-semibold mt-3 tracking-tight ${item.status === 'active' ? 'text-orange-500' : 'text-gray-200'}`}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[11px] mt-1 max-w-[140px] leading-relaxed">{item.description}</p>
              </div>
              
              <div className="relative flex flex-col items-center">
                <div className={`w-px h-10 ${item.status === 'active' ? 'bg-orange-500/50' : 'bg-gray-800'}`} />
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.status === 'completed' ? 'bg-white' : item.status === 'active' ? 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]' : 'bg-gray-800'
                }`} />
              </div>
              
              <div className="mt-5 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                {item.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WallOfMemoriesView() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col relative overflow-hidden">
      <div className="absolute top-10 left-10 z-20">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Wall of Memories</h1>
        <p className="text-gray-400 text-[13px]">Visual identity, inspiration, and captures.</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden relative z-10 w-full h-full pt-32 px-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{ __html: '::-webkit-scrollbar { display: none; }' }} />
        
        <div className="h-[75%] w-max flex gap-8 items-center pr-24">
          {moodboardImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="relative group h-full flex flex-col justify-center"
              style={{ width: idx % 2 === 0 ? '280px' : '400px' }}
            >
              <div className={`overflow-hidden bg-[#111] border border-white/10 ${idx % 3 === 0 ? 'h-[75%]' : 'h-[90%]'} rounded-md shadow-lg`}>
                <img src={img.src} alt="Moodboard Capture" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamView() {
  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Team Profiles</h1>
          <p className="text-[13px] text-gray-500 mt-1">The minds behind the project.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex flex-col group hover:border-gray-300 transition-colors"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-100 mb-4">
                <img src={member.bg} alt="Background" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
                
                <div className="absolute top-5 left-0 right-0 text-center z-10 px-4">
                  <h3 className="text-white text-lg font-semibold tracking-tight mb-1 truncate">{member.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-white/90 text-[10px] font-medium uppercase tracking-wider">
                    <Zap size={10} className="animate-pulse text-yellow-300" /> {member.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 pb-1 mt-auto">
                <div className="flex items-center gap-2">
                  <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-gray-900 leading-tight">{member.handle}</span>
                    <span className="text-[11px] text-gray-500">{member.time}</span>
                  </div>
                </div>
                
                <button className="bg-black text-white px-3 py-1.5 rounded-lg text-[11px] font-medium hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap">
                  View Resume
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Documents</h1>
            <p className="text-[13px] text-gray-500 mt-1">Manage deliverables, assets, and project files.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:border-gray-400 transition-all shadow-sm" />
            </div>
            <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2">
              <UploadCloud size={14} /> Upload
            </button>
          </div>
        </header>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50/80 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-8 md:col-span-5">File Name</div>
            <div className="col-span-4 md:col-span-3 hidden md:block">Date Modified</div>
            <div className="col-span-4 md:col-span-2 hidden md:block">Uploaded By</div>
            <div className="col-span-4 md:col-span-2 text-right">Size</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {documentsList.map((doc) => (
              <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50/50 transition-colors group cursor-pointer">
                <div className="col-span-8 md:col-span-5 flex items-center gap-3">
                  <div className={`p-2 rounded-md border border-gray-200 bg-white shadow-sm ${doc.type === 'pdf' ? 'text-red-600' : doc.type === 'sheet' ? 'text-emerald-600' : 'text-blue-600'}`}>
                    {doc.type === 'pdf' ? <FileText size={14} /> : doc.type === 'sheet' ? <FileSpreadsheet size={14} /> : <FileIcon size={14} />}
                  </div>
                  <span className="text-[13px] font-medium text-gray-900 truncate">{doc.name}</span>
                </div>
                <div className="col-span-4 md:col-span-3 hidden md:block text-[13px] text-gray-500">{doc.date}</div>
                <div className="col-span-4 md:col-span-2 hidden md:block text-[13px] text-gray-500">{doc.author}</div>
                <div className="col-span-4 md:col-span-2 text-[13px] text-gray-500 text-right flex justify-end items-center gap-4">
                  <span>{doc.size}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-opacity">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VersionHistoryView() {
  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Version History</h1>
          <p className="text-[13px] text-gray-500 mt-1">Track changelogs, updates, and deployment history.</p>
        </header>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
          <div className="relative border-l border-gray-200 ml-4 space-y-10 pb-4">
            {versionHistoryData.map((version, idx) => (
              <motion.div key={version.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-400" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-gray-900 tracking-tight">{version.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest border ${version.type === 'patch' ? 'bg-blue-50 text-blue-700 border-blue-200' : version.type === 'minor' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                      {version.type}
                    </span>
                  </div>
                  <span className="text-[13px] text-gray-400">{version.date}</span>
                </div>
                
                <h3 className="text-[14px] font-medium text-gray-900 mb-1.5">{version.title}</h3>
                <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">{version.description}</p>
                
                <div className="flex items-center gap-5 text-[11px] font-medium text-gray-500">
                  <div className="flex items-center gap-1.5"><User size={12} /> {version.author}</div>
                  <div className="flex items-center gap-1.5"><GitPullRequest size={12} /> {version.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessorReviewView() {
  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Professor Review</h1>
          <p className="text-[13px] text-gray-500 mt-1">Evaluation and feedback portal for project deliverables.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50/80 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-gray-900 text-[11px] uppercase tracking-wider">Current Submission</h2>
                  <p className="text-[15px] font-medium text-gray-900 mt-0.5 tracking-tight">Alpha Build Release</p>
                </div>
                <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[11px] font-medium">Awaiting Grade</span>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Submitted Materials</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <ExternalLink size={14} className="text-gray-400" />
                        <span className="text-[13px] font-medium text-gray-700">Live Application Demo</span>
                      </div>
                      <button className="text-[11px] font-medium text-gray-900 hover:underline">Open Link</button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <GitCommit size={14} className="text-gray-400" />
                        <span className="text-[13px] font-medium text-gray-700">GitHub Repository</span>
                      </div>
                      <button className="text-[11px] font-medium text-gray-900 hover:underline">View Source</button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-2">Team Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-[13px] text-gray-600 leading-relaxed font-serif italic">
                      "Professor, we have implemented the core UI and routing as requested in the sprint planning phase. The backend integration is mocked for now, pending database approval."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2 text-[13px] uppercase tracking-wider">
                <GraduationCap size={14} /> Grading Rubric
              </h2>
              <div className="space-y-4 mb-6">
                {rubricCriteria.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-[13px] font-medium mb-1.5">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-400 text-[11px]">/ {item.maxScore}</span>
                    </div>
                    <input type="number" placeholder="0" className="w-full bg-white border border-gray-200 rounded-md px-3 py-1.5 text-[13px] outline-none focus:border-gray-400 transition-all shadow-sm" />
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Overall Feedback</label>
                <textarea rows="4" placeholder="Enter remarks..." className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-gray-400 transition-all resize-none shadow-sm"></textarea>
              </div>
              <button className="w-full bg-black text-white font-medium text-[13px] py-2 rounded-md hover:bg-gray-800 transition-colors shadow-sm">
                Submit Grade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="flex-1 w-full h-full bg-[#fcfcfc] flex flex-col p-6 md:p-10 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Settings</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage project configurations and team preferences.</p>
        </header>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row min-h-[500px]">
          <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-gray-200 p-4 space-y-1 bg-gray-50/50">
            <button className="w-full text-left px-3 py-2 rounded-md text-[13px] font-medium bg-white border border-gray-200 text-gray-900 shadow-sm">General</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">Team Access</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">Integrations</button>
            <button className="w-full text-left px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">Notifications</button>
          </div>
          
          <div className="flex-1 p-6 md:p-8 space-y-10">
            <section>
              <h3 className="text-[11px] font-semibold text-gray-900 mb-5 uppercase tracking-wider">Project Details</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Project Name</label>
                  <input type="text" defaultValue="TeamPortal Collab" className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-gray-400 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Project Description</label>
                  <textarea rows="3" defaultValue="A comprehensive SaaS portal for managing university team projects." className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-gray-400 transition-all resize-none shadow-sm"></textarea>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h3 className="text-[11px] font-semibold text-gray-900 mb-5 uppercase tracking-wider">Repository Configuration</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">GitHub URL</label>
                  <input type="text" placeholder="https://github.com/..." className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-gray-400 transition-all shadow-sm" />
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                  <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-black cursor-pointer">
                    <span className="inline-block h-3 w-3 translate-x-4 transform rounded-full bg-white transition" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-900">Auto-sync commits to Activity Log</span>
                </div>
              </div>
            </section>

            <div className="pt-4 flex justify-end">
              <button className="bg-black text-white px-5 py-2 rounded-md text-[13px] font-medium hover:bg-gray-800 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useGoogleFont();
  const [currentView, setCurrentView] = useState('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Activity },
    { id: 'wall', label: 'Wall of Memories', icon: ImageIcon },
    { id: 'team', label: 'Team Profiles', icon: Users },
    { id: 'documents', label: 'Documents', icon: Folder },
    { id: 'history', label: 'Version History', icon: GitCommit },
    { id: 'review', label: 'Professor Review', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (currentView === 'landing') {
    return (
      <ErrorBoundary>
        <div style={{ fontFamily: "'Poppins', sans-serif" }} className="antialiased">
          <LandingView onEnter={() => setCurrentView('dashboard')} />
        </div>
      </ErrorBoundary>
    );
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-[#fcfcfc] font-sans overflow-hidden selection:bg-black selection:text-white antialiased" style={{ fontFamily: "'Poppins', sans-serif" }}>
        
        {/* Mobile Header */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-[9px]">TP</span>
              </div>
              <span className="text-[14px] font-semibold text-gray-900 tracking-tight">TeamPortal</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
              <Menu size={20} />
            </button>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`fixed md:relative w-64 bg-gray-50/50 border-r border-gray-200 flex flex-col h-full flex-shrink-0 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-5 flex items-center justify-between md:justify-start border-b border-transparent">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentView('landing'); closeMobileMenu(); }}>
              <div className="w-7 h-7 bg-black rounded flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-[10px]">TP</span>
              </div>
              <span className="text-[14px] font-semibold text-gray-900 tracking-tight">TeamPortal</span>
            </div>
            <button onClick={closeMobileMenu} className="md:hidden p-1 text-gray-500 hover:text-gray-900">
              <X size={18} />
            </button>
          </div>
          
          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); closeMobileMenu(); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white text-black shadow-sm border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'} />
                    {item.label}
                  </div>
                  {isActive && <ChevronRight size={12} className="text-gray-300" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-3 px-2 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                 <img src={teamMembers[0].image} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-semibold text-gray-900 leading-tight tracking-tight">Leila Bennett</span>
                <span className="text-[10px] text-gray-500 font-medium">Admin Account</span>
              </div>
            </div>
            <button 
              onClick={() => setCurrentView('landing')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Router Area */}
        <main className="flex-1 h-full relative overflow-hidden bg-transparent pt-14 md:pt-0">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'roadmap' && <RoadmapView />}
          {currentView === 'wall' && <WallOfMemoriesView />}
          {currentView === 'team' && <TeamView />}
          {currentView === 'documents' && <DocumentsView />}
          {currentView === 'history' && <VersionHistoryView />}
          {currentView === 'review' && <ProfessorReviewView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
        
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div onClick={closeMobileMenu} className="md:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" />
        )}
      </div>
    </ErrorBoundary>
  );
}
