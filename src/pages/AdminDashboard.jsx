import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Users, Home, Activity, Trash2, 
  CheckCircle, UserCheck, Mail, ShieldCheck, BarChart3, Search 
} from 'lucide-react';
import API from '../services/api';

const AdminWrapper = styled.div`
  display: flex; min-height: 100vh; background: #F1F5F9; padding-top: 80px;
`;

const Sidebar = styled.nav`
  width: 280px; background: #0F172A; color: white;
  padding: 40px 20px; display: flex; flex-direction: column;
  position: fixed; height: calc(100vh - 80px);
  @media (max-width: 1024px) { width: 80px; padding: 40px 10px; }
`;

const NavItem = styled.button`
  width: 100%; padding: 16px 20px; border-radius: 12px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 15px; font-family: 'Space Grotesk';
  font-weight: 700; font-size: 0.85rem; border: none; cursor: pointer;
  background: ${props => props.$active ? '#FFD700' : 'transparent'};
  color: ${props => props.$active ? '#1F3A93' : 'rgba(255,255,255,0.6)'};
  span { @media (max-width: 1024px) { display: none; } }
  &:hover { background: ${props => props.$active ? '#FFD700' : 'rgba(255,255,255,0.05)'}; }
`;

const Main = styled.main`
  flex: 1; margin-left: 280px; padding: 60px 5%;
  @media (max-width: 1024px) { margin-left: 80px; }
`;

/* --- ELITE TABLE STYLING --- */
const TableContainer = styled.div`
  background: white; border-radius: 24px; padding: 30px;
  border: 1px solid #E2E8F0; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%; border-collapse: collapse; text-align: left;
  th { 
    padding: 20px; border-bottom: 2px solid #F1F5F9; color: #64748B;
    font-family: 'Space Grotesk'; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;
  }
  td { padding: 20px; border-bottom: 1px solid #F1F5F9; font-size: 0.9rem; color: #1F3A93; font-weight: 500; }
  tr:hover { background: #F8FAFC; }
`;

const RoleBadge = styled.span`
  padding: 6px 14px; border-radius: 8px; font-size: 0.7rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1px;
  background: ${props => props.role === 'admin' ? '#1F3A93' : props.role === 'broker' ? '#FFD700' : '#E2E8F0'};
  color: ${props => props.role === 'admin' ? 'white' : '#1F3A93'};
`;

const AdminDashboard = () => {
  const [tab, setTab] = useState('stats');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, properties: 0 });

  useEffect(() => {
    // 1. Fetch Global Stats
    API.get('/admin/stats').then(res => {
      setStats({ users: res.data.data.totalUsers, properties: res.data.data.totalProperties });
    });
    // 2. Fetch User List
    API.get('/admin/users').then(res => setUsers(res.data.data));
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure? This action is permanent.")) {
      try {
        await API.delete(`/admin/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) { alert("Action denied."); }
    }
  };

  return (
    <AdminWrapper>
      <Sidebar>
        <div style={{ marginBottom: '40px', padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFD700' }}>
                <ShieldAlert size={22}/>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '0.85rem' }}>COMMAND</span>
            </div>
        </div>
        <NavItem $active={tab === 'stats'} onClick={() => setTab('stats')}><BarChart3 size={20}/> <span>Analytics</span></NavItem>
        <NavItem $active={tab === 'users'} onClick={() => setTab('users')}><Users size={20}/> <span>Manage Users</span></NavItem>
        <NavItem $active={tab === 'listings'} onClick={() => setTab('listings')}><Home size={20}/> <span>Approvals</span></NavItem>
      </Sidebar>

      <Main>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            
            {/* ANALYTICS TAB */}
            {tab === 'stats' && (
              <>
                <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#1F3A93', marginBottom: '40px' }}>Platform Activity</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '50px' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                        <h4 style={{ color: '#64748B', fontSize: '0.7rem', textTransform:'uppercase' }}>Active Members</h4>
                        <h2 style={{ fontSize: '2.2rem', fontFamily: 'Space Grotesk', color: '#1F3A93' }}>{stats.users}</h2>
                    </div>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                        <h4 style={{ color: '#64748B', fontSize: '0.7rem', textTransform:'uppercase' }}>Live Listings</h4>
                        <h2 style={{ fontSize: '2.2rem', fontFamily: 'Space Grotesk', color: '#1F3A93' }}>{stats.properties}</h2>
                    </div>
                </div>
              </>
            )}

            {/* USER MANAGEMENT TAB */}
            {tab === 'users' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', color: '#1F3A93' }}>User Registry</h1>
                    <div style={{ background: 'white', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #E2E8F0' }}>
                        <Search size={18} color="#64748B" />
                        <input placeholder="Filter users..." style={{ border: 'none', outline: 'none', fontWeight: 600, fontSize: '0.9rem' }} />
                    </div>
                </div>

                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email Identity</th>
                                <th>Role</th>
                                <th>Verification</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td style={{ fontWeight: 700 }}>{u.name}</td>
                                    <td style={{ color: '#64748B' }}>{u.email}</td>
                                    <td><RoleBadge role={u.role}>{u.role}</RoleBadge></td>
                                    <td>
                                        {u.isVerified ? 
                                            <div style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 800 }}><CheckCircle size={14}/> VERIFIED</div> : 
                                            <div style={{ color: '#F59E0B', fontSize: '0.75rem', fontWeight: 800 }}>PENDING</div>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(u._id)} style={{ background: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Main>
    </AdminWrapper>
  );
};

export default AdminDashboard;