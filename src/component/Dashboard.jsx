import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── SVG Icon Components (Pure Tailwind — no external icon library) ───────────

const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconTasks = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const IconTotal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const IconCompleted = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconPending = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconProductivity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconDelete = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const IconSpinner = () => (
  <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// Hamburger / Close icon for mobile menu toggle
const IconMenu = ({ open }) => open ? (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// ─── API Base URL ──────────────────────────────────────────────────────────────
const BASE_URL = 'https://admin-panel-backend-1tym.onrender.com';

// ─── Stat Card Component ───────────────────────────────────────────────────────
const StatCard = ({ title, value, icon, gradient, textColor }) => (
  <div className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 group hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}>
    {/* Gradient accent top-border */}
    <div className={`absolute top-0 left-0 right-0 h-[2px] ${gradient}`} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className={`text-2xl sm:text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl bg-slate-700/60 ${textColor}`}>
        {icon}
      </div>
    </div>
  </div>
);

// ─── Empty State Component ─────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
    <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-slate-400 mb-1">No tasks yet</h3>
    <p className="text-sm text-slate-500 max-w-[200px]">Add your first task using the form above to get started.</p>
  </div>
);

// ─── Main Dashboard Component ──────────────────────────────────────────────────
function Dashboard() {
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────────
  const [dashboardData, setDashboardData] = useState(null);
  const [students, setStudents]           = useState([]);
  const [editIndex, setEditIndex]         = useState(null);
  const [isLoading, setIsLoading]         = useState(false);
  const [activePage, setActivePage]       = useState('dashboard');
  const [notification, setNotification]   = useState(null);  // { type: 'success'|'error', msg }
  const [sidebarOpen, setSidebarOpen]     = useState(false); // mobile sidebar toggle

  const [formData, setFormData] = useState({ name: '', email: '' });

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const authHeader = () => ({ headers: { token: localStorage.getItem('token') } });

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ── Derived stats ─────────────────────────────────────────────────────────────
  const totalTasks     = students.length;
  const completedTasks = students.filter(s => s.completed).length;
  const pendingTasks   = totalTasks - completedTasks;
  const productivity   = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // ── Fetch user & tasks on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }
    axios
      .get(`${BASE_URL}/dashboard`, authHeader())
      .then(res => setDashboardData(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/');
      });

    fetchStudents();
  }, []);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── CRUD Handlers ─────────────────────────────────────────────────────────────
  const fetchStudents = () => {
    axios
      .get(`${BASE_URL}/students/getstudents`)
      .then(res => setStudents(res.data))
      .catch(() => showNotification('error', 'Failed to fetch tasks.'));
  };

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      showNotification('error', 'Task title is required.');
      return;
    }
    setIsLoading(true);

    if (editIndex !== null) {
      axios
        .put(`${BASE_URL}/students/updatestudent/${editIndex}`, formData)
        .then(() => {
          showNotification('success', 'Task updated successfully!');
          fetchStudents();
          resetForm();
        })
        .catch(() => showNotification('error', 'Failed to update task.'))
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post(`${BASE_URL}/students/addstudent`, formData)
        .then(() => {
          showNotification('success', 'Task added successfully!');
          fetchStudents();
          resetForm();
        })
        .catch(() => showNotification('error', 'Failed to add task.'))
        .finally(() => setIsLoading(false));
    }
  };

  const handleEdit = (student) => {
    setEditIndex(student._id);
    setFormData({ name: student.name, email: student.email });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/students/deletestudent/${id}`)
      .then(() => {
        showNotification('success', 'Task deleted.');
        fetchStudents();
      })
      .catch(() => showNotification('error', 'Failed to delete task.'));
  };

  const handleToggleComplete = (student) => {
    axios
      .put(`${BASE_URL}/students/updatestudent/${student._id}`, {
        ...student,
        completed: !student.completed,
      })
      .then(() => fetchStudents())
      .catch(() => showNotification('error', 'Failed to update task status.'));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '' });
    setEditIndex(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // ── Nav Items ─────────────────────────────────────────────────────────────────
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    { id: 'tasks',     label: 'My Tasks',  icon: <IconTasks /> },
    { id: 'settings',  label: 'Settings',  icon: <IconSettings /> },
  ];

  // ─── Shared sidebar content (used in both desktop & mobile drawer) ─────────
  const SidebarContent = ({ onNavClick }) => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">TaskFlow</span>
            <p className="text-[10px] text-slate-400 leading-none">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">Menu</p>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActivePage(item.id); onNavClick && onNavClick(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
              ${activePage === item.id
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
          >
            {item.icon}
            {item.label}
            {activePage === item.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer border border-transparent hover:border-red-500/20"
        >
          <IconLogout />
          Logout
        </button>
      </div>
    </>
  );

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">

      {/* ══════════════════════════════════════════ MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════════════════ SIDEBAR */}
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar — slide-in drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-800 border-r border-slate-700/50 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button inside mobile drawer */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
          aria-label="Close sidebar"
        >
          <IconMenu open={true} />
        </button>
        <SidebarContent onNavClick={() => setSidebarOpen(false)} />
      </aside>

      {/* ═══════════════════════════════════════════════════ MAIN AREA */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">

        {/* ─────────────────────────────────────────────────── TOPBAR */}
        <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Hamburger (mobile only) + Welcome */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex-shrink-0 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-colors"
                aria-label="Open sidebar"
              >
                <IconMenu open={false} />
              </button>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight truncate">
                  Hi, {dashboardData?.user?.name ?? '...'}! 👋
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">{currentDate}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Notification badge */}
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                {pendingTasks > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] text-white flex items-center justify-center font-bold">
                    {pendingTasks > 9 ? '9+' : pendingTasks}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-700">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-sm select-none">
                  {dashboardData?.user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white leading-tight">
                    {dashboardData?.user?.name ?? 'User'}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-none">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ─────────────────────────────────────────────── CONTENT */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">

          {/* Toast Notification */}
          {notification && (
            <div
              className={`fixed top-4 right-4 left-4 sm:left-auto sm:right-6 sm:top-6 z-50 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-2xl text-sm font-medium backdrop-blur-md border transition-all duration-300 sm:max-w-sm
                ${notification.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/20 border-red-500/30 text-red-300'
                }`}
            >
              {notification.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <span className="flex-1">{notification.msg}</span>
            </div>
          )}

          {/* ── STAT CARDS ─────────────────────────────────────────────────── */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={<IconTotal />}
              gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
              textColor="text-indigo-400"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              icon={<IconCompleted />}
              gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
              textColor="text-emerald-400"
            />
            <StatCard
              title="Pending"
              value={pendingTasks}
              icon={<IconPending />}
              gradient="bg-gradient-to-r from-amber-500 to-orange-500"
              textColor="text-amber-400"
            />
            <StatCard
              title="Productivity"
              value={`${productivity}%`}
              icon={<IconProductivity />}
              gradient="bg-gradient-to-r from-purple-500 to-pink-500"
              textColor="text-purple-400"
            />
          </section>

          {/* ── MAIN GRID ──────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

            {/* ── ADD / EDIT TASK FORM ─────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-5 sm:p-6 h-full flex flex-col">

                {/* Card header */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className={`p-2 rounded-lg ${editIndex !== null ? 'bg-amber-500/15' : 'bg-indigo-500/15'}`}>
                    {editIndex !== null ? <IconEdit /> : <IconPlus />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {editIndex !== null ? 'Update Task' : 'Add New Task'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {editIndex !== null ? 'Modify the task details below' : 'Fill in the details below'}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Task Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Design landing page"
                      className="w-full bg-slate-700/50 border border-slate-600/50 text-slate-100 text-sm rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Task Description
                    </label>
                    <textarea
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Brief description of the task…"
                      rows={4}
                      className="w-full bg-slate-700/50 border border-slate-600/50 text-slate-100 text-sm rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-auto pt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-lg
                        ${editIndex !== null
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/25 hover:shadow-amber-400/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'
                        }
                        disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      {isLoading ? (
                        <><IconSpinner /> Processing…</>
                      ) : editIndex !== null ? (
                        <><IconEdit /> Update Task</>
                      ) : (
                        <><IconPlus /> Add Task</>
                      )}
                    </button>

                    {editIndex !== null && (
                      <button
                        onClick={resetForm}
                        className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 bg-slate-700/60 hover:bg-slate-700 border border-slate-600/50 hover:text-slate-200 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── TASK LIST ─────────────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-5 sm:p-6 flex flex-col h-full min-h-[380px] sm:min-h-[420px]">

                {/* Card header */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/15">
                      <IconTasks />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Task List</h2>
                      <p className="text-xs text-slate-400">{totalTasks} task{totalTasks !== 1 ? 's' : ''} total</p>
                    </div>
                  </div>

                  {/* Filter pill (visual only) */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">All</span>
                  </div>
                </div>

                {/* Task items */}
                <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                  {students.length === 0 ? (
                    <EmptyState />
                  ) : (
                    students.map((student, index) => (
                      <div
                        key={student._id}
                        className={`group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all duration-200
                          ${student.completed
                            ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/30'
                            : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/50'
                          }`}
                      >
                        {/* Index badge */}
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-600/60 flex items-center justify-center text-xs font-bold text-slate-400">
                          {index + 1}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold leading-tight truncate ${student.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                            {student.name}
                          </p>
                          {student.email && (
                            <p className={`text-xs mt-1 truncate ${student.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                              {student.email}
                            </p>
                          )}
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold
                            ${student.completed
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-amber-500/15 text-amber-400'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${student.completed ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {student.completed ? 'Completed' : 'Pending'}
                          </span>
                        </div>

                        {/* Actions — always visible on mobile, hover-reveal on desktop */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
                          {/* Mark complete */}
                          <button
                            onClick={() => handleToggleComplete(student)}
                            title={student.completed ? 'Mark as pending' : 'Mark as complete'}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer
                              ${student.completed
                                ? 'bg-slate-600/60 text-slate-400 hover:bg-slate-500/60 hover:text-slate-200'
                                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:text-emerald-300'
                              }`}
                          >
                            <IconCheck />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(student)}
                            title="Edit task"
                            className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 hover:text-indigo-300 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <IconEdit />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(student._id)}
                            title="Delete task"
                            className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <IconDelete />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ─────────────────────────────────────────────────── FOOTER */}
        <footer className="px-4 sm:px-8 py-4 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-600">
            TaskFlow Admin Panel &copy; {new Date().getFullYear()} — Built with React &amp; Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
