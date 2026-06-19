import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { AuthContext } from './AuthContext';

// Check if Firebase is valid or if we should use Mock Mode
const isFirebaseMock = () => {
  const apiKey = (import.meta.env.VITE_FIREBASE_API_KEY || '').trim().replace(/[,"']+$/, '');
  return !apiKey || apiKey === 'your_api_key_here' || apiKey === '';
};

// --- MOCK DATABASE SEED DATA ---
const initialMockUsers = {
  'resident@example.com': { uid: 'u_res_1', email: 'resident@example.com', fullName: 'Mary Johnson', role: 'resident', zone: 'Zone A', phone: '08031234567', createdAt: Date.now() },
  'artisan@example.com': { uid: 'u_art_1', email: 'artisan@example.com', fullName: 'John Plumbing Expert', role: 'artisan', zone: 'Zone A', phone: '08029876543', createdAt: Date.now() },
  'admin@example.com': { uid: 'u_adm_1', email: 'admin@example.com', fullName: 'Super Admin', role: 'admin', createdAt: Date.now() },
};

const initialMockArtisans = [
  {
    uid: 'u_art_1',
    fullName: 'John Plumbing Expert',
    email: 'artisan@example.com',
    phone: '08029876543',
    category: 'Plumbing',
    zone: 'Zone A',
    experienceYears: 5,
    bio: 'I specialize in all plumbing installations, repairs, and leak fixes. Reliable, fast, and affordable.',
    status: 'approved',
    ratingAverage: 4.6,
    ratingCount: 23,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30 // 30 days ago
  },
  {
    uid: 'u_art_2',
    fullName: 'Emeka Electricals',
    email: 'emeka@example.com',
    phone: '08051234567',
    category: 'Electrical',
    zone: 'Zone B',
    experienceYears: 4,
    bio: 'Licensed electrician for house wiring, socket replacements, and lighting installations.',
    status: 'pending',
    ratingAverage: 4.7,
    ratingCount: 15,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    uid: 'u_art_3',
    fullName: 'WoodMaster Carpentry',
    email: 'woodmaster@example.com',
    phone: '08123456789',
    category: 'Carpentry',
    zone: 'Zone C',
    experienceYears: 8,
    bio: 'Custom furniture, cabinet repairs, door hanging, and roof timber structure work.',
    status: 'approved',
    ratingAverage: 4.8,
    ratingCount: 41,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60
  },
  {
    uid: 'u_art_4',
    fullName: 'Bright Paints',
    email: 'bright@example.com',
    phone: '09012345678',
    category: 'Painting',
    zone: 'Zone A',
    experienceYears: 3,
    bio: 'Professional wall painting, wallpaper installation, and exterior surface coating.',
    status: 'approved',
    ratingAverage: 4.4,
    ratingCount: 8,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10
  }
];

const initialMockJobs = [
  {
    id: 'j_1',
    title: 'Fix kitchen tap',
    description: 'The kitchen tap is leaking and needs to be fixed. Check all fittings and ensure no more leaks.',
    category: 'Plumbing',
    zone: 'Zone A',
    locationDetails: 'House 12, Unity Street, Zone A',
    budget: '₦5,000 - ₦8,000',
    residentId: 'u_res_1',
    residentName: 'Mary Johnson',
    status: 'in-progress',
    createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    hiredArtisanId: 'u_art_1',
    hiredArtisanName: 'John Plumbing Expert',
    agreedPrice: 6500,
    bids: [
      { artisanId: 'u_art_1', artisanName: 'John Plumbing Expert', artisanRating: 4.6, price: 6500, description: 'I can fix this today. I have the necessary washers and seals.', createdAt: Date.now() - 1000 * 60 * 60 * 4 },
      { artisanId: 'u_art_4', artisanName: 'Bright Paints', artisanRating: 4.4, price: 7500, description: 'Can assist but I mainly do painting. Can inspect though.', createdAt: Date.now() - 1000 * 60 * 60 * 3 }
    ]
  },
  {
    id: 'j_2',
    title: 'Install ceiling fan',
    description: 'Need a professional electrician to assemble and mount a new ceiling fan in the living room.',
    category: 'Electrical',
    zone: 'Zone A',
    locationDetails: 'Flat 4, Redwood Estate, Zone A',
    budget: '₦7,000 - ₦10,000',
    residentId: 'u_res_1',
    residentName: 'Mary Johnson',
    status: 'open',
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    bids: [
      { artisanId: 'u_art_2', artisanName: 'Emeka Electricals', artisanRating: 4.7, price: 8000, description: 'Experienced with ceiling fan mounting. Fully equipped.', createdAt: Date.now() - 1000 * 60 * 60 * 18 }
    ]
  },
  {
    id: 'j_3',
    title: 'Paint living room',
    description: 'Painting the living room walls with white emulsion paint. Paint will be provided.',
    category: 'Painting',
    zone: 'Zone A',
    locationDetails: 'House 12, Unity Street, Zone A',
    budget: '₦15,000 - ₦20,000',
    residentId: 'u_res_1',
    residentName: 'Mary Johnson',
    status: 'completed',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    hiredArtisanId: 'u_art_4',
    hiredArtisanName: 'Bright Paints',
    agreedPrice: 18000,
    bids: [
      { artisanId: 'u_art_4', artisanName: 'Bright Paints', artisanRating: 4.4, price: 18000, description: 'Can complete this in one day with neat finishing.', createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4.5 }
    ]
  }
];

const initialMockRatings = [
  {
    id: 'r_1',
    jobId: 'j_3',
    residentId: 'u_res_1',
    residentName: 'Mary Johnson',
    artisanId: 'u_art_4',
    artisanName: 'Bright Paints',
    rating: 5,
    reviewText: 'Great work! Very professional and on time.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4
  }
];

// Initialize Mock DB in localStorage if it doesn't exist
const initMockDatabase = () => {
  if (!localStorage.getItem('cc_users')) {
    localStorage.setItem('cc_users', JSON.stringify(initialMockUsers));
  }
  if (!localStorage.getItem('cc_artisans')) {
    localStorage.setItem('cc_artisans', JSON.stringify(initialMockArtisans));
  }
  if (!localStorage.getItem('cc_jobs')) {
    localStorage.setItem('cc_jobs', JSON.stringify(initialMockJobs));
  }
  if (!localStorage.getItem('cc_ratings')) {
    localStorage.setItem('cc_ratings', JSON.stringify(initialMockRatings));
  }
  if (!localStorage.getItem('cc_zones')) {
    localStorage.setItem('cc_zones', JSON.stringify([
      { id: 'z_1', name: 'Zone A' },
      { id: 'z_2', name: 'Zone B' },
      { id: 'z_3', name: 'Zone C' }
    ]));
  }
  if (!localStorage.getItem('cc_support')) {
    localStorage.setItem('cc_support', JSON.stringify([
      {
        id: 's_1',
        userId: 'u_res_1',
        userEmail: 'resident@example.com',
        userName: 'Mary Johnson',
        userRole: 'resident',
        message: 'Hello, I need some help finding an electrician.',
        senderId: 'u_res_1',
        senderName: 'Mary Johnson',
        isAdminReply: false,
        createdAt: Date.now() - 1000 * 60 * 60 * 2
      },
      {
        id: 's_2',
        userId: 'u_res_1',
        userEmail: 'resident@example.com',
        userName: 'Mary Johnson',
        userRole: 'resident',
        message: 'Sure! Let me check on the available electricians in Zone A.',
        senderId: 'u_adm_1',
        senderName: 'Super Admin',
        isAdminReply: true,
        createdAt: Date.now() - 1000 * 60 * 60 * 1.8
      }
    ]));
  }
};

const getMockData = (key) => JSON.parse(localStorage.getItem(key));
const saveMockData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export function AuthProvider({ children }) {
  const initialIsMock = isFirebaseMock();

  const [isMock, setIsMock] = useState(initialIsMock);
  
  const [currentUser, setCurrentUser] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      const savedUser = localStorage.getItem('cc_current_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && !parsed.role) {
          parsed.role = 'resident';
        }
        return parsed;
      }
      return null;
    }
    return null;
  });

  const [jobs, setJobs] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      return getMockData('cc_jobs') || [];
    }
    return [];
  });

  const [artisans, setArtisans] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      return getMockData('cc_artisans') || [];
    }
    return [];
  });

  const [ratings, setRatings] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      return getMockData('cc_ratings') || [];
    }
    return [];
  });

  const [notifications, setNotifications] = useState(() => {
    if (initialIsMock) {
      if (!localStorage.getItem('cc_notifications')) {
        localStorage.setItem('cc_notifications', JSON.stringify([]));
      }
      return getMockData('cc_notifications') || [];
    }
    return [];
  });

  const [zones, setZones] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      return getMockData('cc_zones') || [];
    }
    return [];
  });

  const [supportMessages, setSupportMessages] = useState(() => {
    if (initialIsMock) {
      initMockDatabase();
      return getMockData('cc_support') || [];
    }
    return [];
  });

  const [toast, setToast] = useState(null);

  const [loading, setLoading] = useState(() => {
    return !initialIsMock;
  });

  useEffect(() => {
    localStorage.setItem('cc_is_mock_session', String(initialIsMock));
  }, [initialIsMock]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setToast(prev => prev && prev.message === message ? null : prev);
    }, 3500);
  };

  const addNotification = async (userId, title, message, jobId) => {
    const newNotif = {
      userId,
      title,
      message,
      jobId,
      read: false,
      createdAt: Date.now()
    };
    if (isMock) {
      const currentNotifs = getMockData('cc_notifications') || [];
      const updated = [{ id: 'n_' + Date.now() + Math.random().toString(36).substr(2, 5), ...newNotif }, ...currentNotifs];
      saveMockData('cc_notifications', updated);
      setNotifications(updated);
    } else {
      await addDoc(collection(db, 'notifications'), newNotif);
    }
  };

  const markNotificationRead = async (id) => {
    if (isMock) {
      const currentNotifs = getMockData('cc_notifications') || [];
      const updated = currentNotifs.map(n => n.id === id ? { ...n, read: true } : n);
      saveMockData('cc_notifications', updated);
      setNotifications(updated);
    } else {
      const ref = doc(db, 'notifications', id);
      await updateDoc(ref, { read: true });
    }
  };

  const clearAllNotifications = async (userId) => {
    if (isMock) {
      const currentNotifs = getMockData('cc_notifications') || [];
      const updated = currentNotifs.map(n => n.userId === userId ? { ...n, read: true } : n);
      saveMockData('cc_notifications', updated);
      setNotifications(updated);
    } else {
      const userNotifs = notifications.filter(n => n.userId === userId && !n.read);
      for (const n of userNotifs) {
        await updateDoc(doc(db, 'notifications', n.id), { read: true });
      }
    }
  };

  // Auth State Listener
  useEffect(() => {
    if (isMock) return;
    try {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              role: data.role || 'resident',
              ...data
            });
          } else {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              role: 'resident'
            });
          }
          localStorage.setItem('cc_is_mock_session', 'false');
          setIsMock(false);
        } else {
          const savedMockSess = localStorage.getItem('cc_is_mock_session');
          if (savedMockSess !== 'true') {
            setCurrentUser(null);
          }
        }
        setLoading(false);
      }, (error) => {
        console.error("Firebase auth error:", error);
        setLoading(false);
      });
      return unsubscribeAuth;
    } catch (err) {
      console.error("Firebase Auth listener registration failed.", err);
      setTimeout(() => setLoading(false), 0);
    }
  }, [isMock]);

  // Subscribe to Zones globally (since registration needs it too)
  useEffect(() => {
    if (isMock) return;
    try {
      console.log("Subscribing to Firestore zones collection globally");
      const unsubscribeZones = onSnapshot(collection(db, 'zones'), (snapshot) => {
        const zonesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setZones(zonesList);
      }, (err) => console.error("Firestore zones listener error:", err));
      return unsubscribeZones;
    } catch (err) {
      console.error("Firestore zones subscription setup failed:", err);
    }
  }, [isMock]);

  // Firestore Collections Subscription (Dependent on Logged-in User Role/UID)
  useEffect(() => {
    if (isMock) return;
    if (!currentUser) {
      setTimeout(() => {
        setJobs([]);
        setArtisans([]);
        setRatings([]);
        setNotifications([]);
        setSupportMessages([]);
      }, 0);
      return;
    }

    try {
      console.log("Subscribing to Firestore collections for user:", currentUser.uid);
      const unsubscribeJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
        const jobsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        jobsList.sort((a, b) => b.createdAt - a.createdAt);
        setJobs(jobsList);
      }, (err) => console.error("Firestore jobs listener error:", err));

      const unsubscribeArtisans = onSnapshot(collection(db, 'artisans'), (snapshot) => {
        const artisansList = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        setArtisans(artisansList);
      }, (err) => console.error("Firestore artisans listener error:", err));

      const unsubscribeRatings = onSnapshot(collection(db, 'ratings'), (snapshot) => {
        const ratingsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        ratingsList.sort((a, b) => b.createdAt - a.createdAt);
        setRatings(ratingsList);
      }, (err) => console.error("Firestore ratings listener error:", err));

      const unsubscribeNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
        const notificationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        notificationsList.sort((a, b) => a.createdAt - b.createdAt);
        setNotifications(notificationsList);
      }, (err) => console.error("Firestore notifications listener error:", err));

      const unsubscribeSupport = onSnapshot(collection(db, 'support'), (snapshot) => {
        const supportList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        supportList.sort((a, b) => a.createdAt - b.createdAt);
        setSupportMessages(supportList);
      }, (err) => console.error("Firestore support listener error:", err));

      return () => {
        console.log("Unsubscribing from Firestore collections for user:", currentUser.uid);
        unsubscribeJobs();
        unsubscribeArtisans();
        unsubscribeRatings();
        unsubscribeNotifications();
        unsubscribeSupport();
      };
    } catch (err) {
      console.error("Firestore subscription setup failed:", err);
    }
  }, [isMock, currentUser]);

  // For Mock Mode: reload states from localStorage whenever current user changes (fixes dashboard refresh lag on login/logout)
  useEffect(() => {
    if (!isMock) return;
    try {
      console.log("Mock Mode - Reloading states from localStorage for user:", currentUser?.uid);
      initMockDatabase();
      setTimeout(() => {
        setJobs(getMockData('cc_jobs') || []);
        setArtisans(getMockData('cc_artisans') || []);
        setRatings(getMockData('cc_ratings') || []);
        setNotifications(getMockData('cc_notifications') || []);
        setZones(getMockData('cc_zones') || []);
        setSupportMessages(getMockData('cc_support') || []);
      }, 0);
    } catch (err) {
      console.error("Mock Mode state reload failed:", err);
    }
  }, [isMock, currentUser]);

  // Sync state between browser tabs in Mock Mode via storage event listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      try {
        if (e.key === 'cc_is_mock_session') {
          const isMockSess = e.newValue === 'true';
          if (!isFirebaseMock()) {
            setIsMock(false);
          } else {
            setIsMock(isMockSess);
          }
        }
        if (!isMock) return;
        if (e.key === 'cc_support') {
          setSupportMessages(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_jobs') {
          setJobs(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_artisans') {
          setArtisans(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_ratings') {
          setRatings(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_notifications') {
          setNotifications(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_zones') {
          setZones(JSON.parse(e.newValue) || []);
        } else if (e.key === 'cc_current_user') {
          const u = JSON.parse(e.newValue);
          if (u && !u.role) u.role = 'resident';
          setCurrentUser(u);
        }
      } catch (err) {
        console.error("Storage change sync error:", err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isMock]);

  // --- AUTH ACTIONS ---

  const login = async (email, password) => {
    // Helper: try mock login
    const tryMockLogin = (emailKey) => {
      initMockDatabase();
      const mockUsers = getMockData('cc_users');
      const user = mockUsers[emailKey];
      if (user) {
        localStorage.setItem('cc_is_mock_session', 'true');
        setIsMock(true);
        setCurrentUser(user);
        localStorage.setItem('cc_current_user', JSON.stringify(user));
        return user;
      }
      return null;
    };

    if (isMock) {
      const user = tryMockLogin(email.toLowerCase());
      if (user) return user;
      throw new Error('User not found. Try resident@example.com, artisan@example.com, or admin@example.com');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = userDoc.exists() ? userDoc.data() : { role: 'resident' };
        const fullUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: userData.role || 'resident',
          ...userData
        };
        localStorage.setItem('cc_is_mock_session', 'false');
        setIsMock(false);
        setCurrentUser(fullUser);
        return fullUser;
      } catch (firebaseErr) {
        const code = firebaseErr?.code || '';
        
        // Auto-seed demo accounts in real Firebase if they don't exist yet
        if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
          const lowerEmail = email.toLowerCase();
          try {
            if (lowerEmail === 'admin@example.com') {
              console.log("Auto-seeding Admin account in Firebase Auth & Firestore...");
              const seededUser = await registerAdmin('Super Admin', 'admin@example.com', password);
              return seededUser;
            } else if (lowerEmail === 'resident@example.com') {
              console.log("Auto-seeding Resident account in Firebase Auth & Firestore...");
              const seededUser = await registerResident('Mary Johnson', 'resident@example.com', password, '08031234567', 'Zone A');
              return seededUser;
            } else if (lowerEmail === 'artisan@example.com') {
              console.log("Auto-seeding Artisan account in Firebase Auth & Firestore...");
              const seededUser = await registerArtisan(
                'John Plumbing Expert', 
                'artisan@example.com', 
                password, 
                '08029876543', 
                'Zone A', 
                'Plumbing', 
                5, 
                'I specialize in all plumbing installations, repairs, and leak fixes. Reliable, fast, and affordable.'
              );
              return seededUser;
            }
          } catch (seedErr) {
            console.error("Auto-seeding of demo account failed:", seedErr);
          }
        }
        
        // Re-throw with a friendlier message
        throw new Error(
          code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password'
            ? 'Invalid email or password. Check your credentials and try again.'
            : firebaseErr.message,
          { cause: firebaseErr }
        );
      }
    }
  };

  const registerResident = async (fullName, email, password, phone, zone) => {
    const payload = {
      fullName,
      email: email.toLowerCase(),
      role: 'resident',
      phone,
      zone,
      createdAt: Date.now()
    };

    if (isMock) {
      const mockUsers = getMockData('cc_users');
      if (mockUsers[payload.email]) {
        throw new Error('Email already registered.');
      }
      const uid = 'u_res_' + Date.now();
      const newUser = { uid, ...payload };
      mockUsers[payload.email] = newUser;
      saveMockData('cc_users', mockUsers);
      
      localStorage.setItem('cc_is_mock_session', 'true');
      setIsMock(true);
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
      return newUser;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, payload);
      const fullUser = { uid: userCredential.user.uid, ...payload };
      localStorage.setItem('cc_is_mock_session', 'false');
      setIsMock(false);
      setCurrentUser(fullUser);
      return fullUser;
    }
  };

  const registerArtisan = async (fullName, email, password, phone, zone, category, experienceYears, bio) => {
    const payload = {
      fullName,
      email: email.toLowerCase(),
      role: 'artisan',
      phone,
      zone,
      createdAt: Date.now()
    };

    const artisanPayload = {
      fullName,
      email: email.toLowerCase(),
      phone,
      zone,
      category,
      experienceYears: Number(experienceYears),
      bio,
      status: 'pending',
      ratingAverage: 0,
      ratingCount: 0,
      createdAt: Date.now()
    };

    if (isMock) {
      const mockUsers = getMockData('cc_users');
      if (mockUsers[payload.email]) {
        throw new Error('Email already registered.');
      }
      const uid = 'u_art_' + Date.now();
      const newUser = { uid, ...payload };
      mockUsers[payload.email] = newUser;
      saveMockData('cc_users', mockUsers);

      const mockArtisans = getMockData('cc_artisans');
      const updatedArtisans = [...mockArtisans, { uid, ...artisanPayload }];
      saveMockData('cc_artisans', updatedArtisans);
      setArtisans(updatedArtisans);

      localStorage.setItem('cc_is_mock_session', 'true');
      setIsMock(true);
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
      return newUser;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      const artisanRef = doc(db, 'artisans', userCredential.user.uid);
      
      await setDoc(userRef, payload);
      await setDoc(artisanRef, { uid: userCredential.user.uid, ...artisanPayload });
      
      const fullUser = { uid: userCredential.user.uid, ...payload };
      localStorage.setItem('cc_is_mock_session', 'false');
      setIsMock(false);
      setCurrentUser(fullUser);
      return fullUser;
    }
  };

  const registerAdmin = async (fullName, email, password) => {
    const payload = {
      fullName,
      email: email.toLowerCase(),
      role: 'admin',
      createdAt: Date.now()
    };

    if (isMock) {
      const mockUsers = getMockData('cc_users');
      if (mockUsers[payload.email]) {
        throw new Error('Email already registered.');
      }
      const uid = 'u_adm_' + Date.now();
      const newUser = { uid, ...payload };
      mockUsers[payload.email] = newUser;
      saveMockData('cc_users', mockUsers);
      
      localStorage.setItem('cc_is_mock_session', 'true');
      setIsMock(true);
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
      return newUser;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, payload);
      const fullUser = { uid: userCredential.user.uid, ...payload };
      localStorage.setItem('cc_is_mock_session', 'false');
      setIsMock(false);
      setCurrentUser(fullUser);
      return fullUser;
    }
  };

  const logout = async () => {
    if (isMock) {
      setCurrentUser(null);
      localStorage.removeItem('cc_current_user');
      localStorage.setItem('cc_is_mock_session', String(isFirebaseMock()));
      setIsMock(isFirebaseMock());
    } else {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.setItem('cc_is_mock_session', String(isFirebaseMock()));
      setIsMock(isFirebaseMock());
    }
  };

  // --- DATABASE READS & WRITES ---

  const getJobs = () => jobs || [];
  const getArtisans = () => artisans || [];
  const getRatings = () => ratings || [];

  const createJob = async (jobData) => {
    if (isMock) {
      const newJob = {
        id: 'j_' + Date.now(),
        ...jobData,
        status: 'open',
        bids: [],
        createdAt: Date.now()
      };
      const updated = [newJob, ...jobs];
      saveMockData('cc_jobs', updated);
      setJobs(updated);
      return newJob;
    } else {
      const cleanJobData = {};
      Object.keys(jobData).forEach(key => {
        if (jobData[key] !== undefined) {
          cleanJobData[key] = jobData[key];
        }
      });
      
      const newJob = {
        residentName: jobData.residentName || currentUser?.fullName || currentUser?.email || 'Resident',
        ...cleanJobData,
        status: 'open',
        bids: [],
        createdAt: Date.now()
      };
      console.log("Firestore createJob writing job:", newJob);
      const docRef = await addDoc(collection(db, 'jobs'), newJob);
      console.log("Firestore createJob success, doc ID:", docRef.id);
    }
  };

  const placeBid = async (jobId, bidData) => {
    let residentId = '';
    let jobTitle = '';
    const timestamp = new Date().getTime();

    if (isMock) {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        residentId = job.residentId;
        jobTitle = job.title;
      }
    } else {
      const jobRef = doc(db, 'jobs', jobId);
      const jobDoc = await getDoc(jobRef);
      if (jobDoc.exists()) {
        residentId = jobDoc.data().residentId;
        jobTitle = jobDoc.data().title;
      }
    }

    if (isMock) {
      const updated = jobs.map(j => {
        if (j.id === jobId) {
          const cleanBids = j.bids.filter(b => b.artisanId !== bidData.artisanId);
          return {
            ...j,
            bids: [...cleanBids, { ...bidData, createdAt: timestamp }]
          };
        }
        return j;
      });
      saveMockData('cc_jobs', updated);
      setJobs(updated);
    } else {
      const jobRef = doc(db, 'jobs', jobId);
      const jobDoc = await getDoc(jobRef);
      if (jobDoc.exists()) {
        const job = jobDoc.data();
        const cleanBids = (job.bids || []).filter(b => b.artisanId !== bidData.artisanId);
        
        // Clean bidData from any undefined values
        const cleanBid = {};
        Object.keys(bidData).forEach(key => {
          if (bidData[key] !== undefined) {
            cleanBid[key] = bidData[key];
          }
        });

        const updatedBids = [...cleanBids, { 
          artisanName: bidData.artisanName || currentUser?.fullName || currentUser?.email || 'Artisan',
          ...cleanBid, 
          createdAt: timestamp 
        }];
        await updateDoc(jobRef, { bids: updatedBids });
      }
    }

    if (residentId) {
      await addNotification(
        residentId,
        "New Bid Received",
        `${bidData.artisanName || 'An artisan'} placed a bid of ₦${Number(bidData.price).toLocaleString()} on your job: "${jobTitle}"`,
        jobId
      );

      // Retrieve resident email to trigger email alert
      let residentEmail;
      if (isMock) {
        const mockUsers = getMockData('cc_users') || {};
        const residentUser = Object.values(mockUsers).find(u => u.uid === residentId);
        residentEmail = residentUser ? residentUser.email : 'resident@example.com';
      } else {
        const userRef = doc(db, 'users', residentId);
        const userDoc = await getDoc(userRef);
        residentEmail = userDoc.exists() ? userDoc.data().email : 'resident@example.com';
      }

      if (residentEmail) {
        sendNotificationEmail(
          residentEmail,
          "New Bid Received on CampCraft",
          `Hello, an artisan (${bidData.artisanName}) has bidded ₦${Number(bidData.price).toLocaleString()} on your job request "${jobTitle}". Please log in to review and accept the bid.`
        );
      }
    }
  };

  const hireArtisanForJob = async (jobId, artisanId, price) => {
    let jobTitle = '';
    let residentName = '';
    if (isMock) {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        jobTitle = job.title;
        residentName = job.residentName;
      }
    } else {
      const jobDoc = await getDoc(doc(db, 'jobs', jobId));
      if (jobDoc.exists()) {
        jobTitle = jobDoc.data().title;
        residentName = jobDoc.data().residentName;
      }
    }

    if (isMock) {
      const artisan = artisans.find(a => a.uid === artisanId);
      const updated = jobs.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'in-progress',
            hiredArtisanId: artisanId,
            hiredArtisanName: artisan ? artisan.fullName : 'Hired Artisan',
            agreedPrice: Number(price)
          };
        }
        return j;
      });
      saveMockData('cc_jobs', updated);
      setJobs(updated);
    } else {
      const jobRef = doc(db, 'jobs', jobId);
      const artisanRef = doc(db, 'artisans', artisanId);
      const artisanDoc = await getDoc(artisanRef);
      const artisanName = artisanDoc.exists() ? artisanDoc.data().fullName : 'Hired Artisan';
      await updateDoc(jobRef, {
        status: 'in-progress',
        hiredArtisanId: artisanId,
        hiredArtisanName: artisanName,
        agreedPrice: Number(price)
      });
    }

    await addNotification(
      artisanId,
      "Bid Accepted!",
      `Your bid on "${jobTitle}" has been accepted by ${residentName || 'the resident'} for ₦${Number(price).toLocaleString()}.`,
      jobId
    );

    // Retrieve artisan email to trigger email alert
    let artisanEmail;
    if (isMock) {
      const mockUsers = getMockData('cc_users') || {};
      const artisanUser = Object.values(mockUsers).find(u => u.uid === artisanId);
      artisanEmail = artisanUser ? artisanUser.email : 'artisan@example.com';
    } else {
      const userRef = doc(db, 'users', artisanId);
      const userDoc = await getDoc(userRef);
      artisanEmail = userDoc.exists() ? userDoc.data().email : 'artisan@example.com';
    }

    if (artisanEmail) {
      sendNotificationEmail(
        artisanEmail,
        "Bid Accepted on CampCraft!",
        `Hello, your bid on "${jobTitle}" has been accepted by ${residentName || 'the resident'} for ₦${Number(price).toLocaleString()}. You can now start the contract from your portal.`
      );
    }
  };

  const completeJob = async (jobId) => {
    if (isMock) {
      const updated = jobs.map(j => {
        if (j.id === jobId) {
          return { ...j, status: 'completed' };
        }
        return j;
      });
      saveMockData('cc_jobs', updated);
      setJobs(updated);
    } else {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, { status: 'completed' });
    }
  };

  const cancelJob = async (jobId) => {
    if (isMock) {
      const updated = jobs.map(j => {
        if (j.id === jobId) {
          return { ...j, status: 'cancelled' };
        }
        return j;
      });
      saveMockData('cc_jobs', updated);
      setJobs(updated);
    } else {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, { status: 'cancelled' });
    }
  };

  const updateArtisanStatus = async (uid, status) => {
    if (isMock) {
      const updated = artisans.map(a => a.uid === uid ? { ...a, status } : a);
      saveMockData('cc_artisans', updated);
      setArtisans(updated);
    } else {
      const artisanRef = doc(db, 'artisans', uid);
      await updateDoc(artisanRef, { status });
    }
  };

  const updateArtisanProfile = async (uid, profileData) => {
    if (isMock) {
      const updated = artisans.map(a => a.uid === uid ? { ...a, ...profileData } : a);
      saveMockData('cc_artisans', updated);
      setArtisans(updated);

      const mockUsers = getMockData('cc_users');
      const email = Object.keys(mockUsers).find(k => mockUsers[k].uid === uid);
      if (email) {
        mockUsers[email] = { ...mockUsers[email], fullName: profileData.fullName, phone: profileData.phone, zone: profileData.zone };
        saveMockData('cc_users', mockUsers);
        if (currentUser && currentUser.uid === uid) {
          const newCurrentUser = { ...currentUser, ...profileData };
          setCurrentUser(newCurrentUser);
          localStorage.setItem('cc_current_user', JSON.stringify(newCurrentUser));
        }
      }
    } else {
      const userRef = doc(db, 'users', uid);
      const artisanRef = doc(db, 'artisans', uid);
      await setDoc(userRef, {
        fullName: profileData.fullName,
        phone: profileData.phone,
        zone: profileData.zone
      }, { merge: true });
      await setDoc(artisanRef, profileData, { merge: true });
      if (currentUser && currentUser.uid === uid) {
        setCurrentUser(prev => ({ ...prev, ...profileData }));
      }
    }
  };

  const updateResidentProfile = async (uid, profileData) => {
    if (isMock) {
      const mockUsers = getMockData('cc_users');
      const email = Object.keys(mockUsers).find(k => mockUsers[k].uid === uid);
      if (email) {
        mockUsers[email] = { ...mockUsers[email], ...profileData };
        saveMockData('cc_users', mockUsers);
        const newCurrentUser = { ...currentUser, ...profileData };
        setCurrentUser(newCurrentUser);
        localStorage.setItem('cc_current_user', JSON.stringify(newCurrentUser));
      }
    } else {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, profileData, { merge: true });
      setCurrentUser(prev => ({ ...prev, ...profileData }));
    }
  };

  const addZone = async (name) => {
    const newZone = { name, createdAt: Date.now() };
    if (isMock) {
      const currentZones = getMockData('cc_zones') || [];
      const updated = [...currentZones, { id: 'z_' + Date.now(), ...newZone }];
      saveMockData('cc_zones', updated);
      setZones(updated);
    } else {
      await addDoc(collection(db, 'zones'), newZone);
    }
  };

  const sendSupportMessage = async (text) => {
    if (!currentUser) return;
    const newMessage = {
      userId: currentUser.uid || '',
      userEmail: currentUser.email || '',
      userName: currentUser.fullName || currentUser.email || 'User',
      userRole: currentUser.role || 'resident',
      message: text || '',
      senderId: currentUser.uid || '',
      senderName: currentUser.fullName || currentUser.email || 'User',
      isAdminReply: false,
      createdAt: Date.now()
    };
    if (isMock) {
      const currentSupport = getMockData('cc_support') || [];
      const updated = [...currentSupport, { id: 's_' + Date.now(), ...newMessage }];
      saveMockData('cc_support', updated);
      setSupportMessages(updated);
    } else {
      await addDoc(collection(db, 'support'), newMessage);
    }
  };

  const adminReplySupportMessage = async (userId, userEmail, userName, text) => {
    if (!currentUser || currentUser.role !== 'admin') return;
    const newMessage = {
      userId: userId || '',
      userEmail: userEmail || '',
      userName: userName || userEmail || 'User',
      userRole: 'resident',
      message: text || '',
      senderId: currentUser.uid || '',
      senderName: currentUser.fullName || 'Admin',
      isAdminReply: true,
      createdAt: Date.now()
    };
    if (isMock) {
      const currentSupport = getMockData('cc_support') || [];
      const updated = [...currentSupport, { id: 's_' + Date.now(), ...newMessage }];
      saveMockData('cc_support', updated);
      setSupportMessages(updated);
    } else {
      await addDoc(collection(db, 'support'), newMessage);
    }
  };

  const submitRating = async (ratingData) => {
    if (isMock) {
      const newRating = {
        id: 'r_' + Date.now(),
        ...ratingData,
        createdAt: Date.now()
      };
      const updatedRatings = [newRating, ...ratings];
      saveMockData('cc_ratings', updatedRatings);
      setRatings(updatedRatings);

      // Update artisan average rating
      const updatedArtisans = artisans.map(art => {
        if (art.uid === ratingData.artisanId) {
          const currentTotal = Number(art.ratingAverage || 0) * Number(art.ratingCount || 0);
          const newCount = Number(art.ratingCount || 0) + 1;
          const newAvg = Number(((currentTotal + Number(ratingData.rating)) / newCount).toFixed(1));
          return {
            ...art,
            ratingAverage: newAvg,
            ratingCount: newCount
          };
        }
        return art;
      });
      saveMockData('cc_artisans', updatedArtisans);
      setArtisans(updatedArtisans);
    } else {
      const ratingPayload = {
        ...ratingData,
        createdAt: Date.now()
      };
      await addDoc(collection(db, 'ratings'), ratingPayload);

      // Update artisan average rating
      const artisanRef = doc(db, 'artisans', ratingData.artisanId);
      const artisanDoc = await getDoc(artisanRef);
      if (artisanDoc.exists()) {
        const art = artisanDoc.data();
        const currentTotal = Number(art.ratingAverage || 0) * Number(art.ratingCount || 0);
        const newCount = Number(art.ratingCount || 0) + 1;
        const newAvg = Number(((currentTotal + Number(ratingData.rating)) / newCount).toFixed(1));
        await updateDoc(artisanRef, {
          ratingAverage: newAvg,
          ratingCount: newCount
        });
      }
    }
  };

  // --- EMAIL & PASSWORD ACTIONS ---

  const sendNotificationEmail = async (email, subject, message) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("=== EMAIL DISPATCH ===");
    console.log("To:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("======================");

    if (serviceId && templateId && publicKey) {
      try {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: email,
              subject: subject,
              message: message,
            },
          }),
        });

        if (response.ok) {
          console.log("Email successfully sent via EmailJS!");
          showToast(`Notification email sent to ${email}`, 'success');
        } else {
          const errText = await response.text();
          console.error("EmailJS sending failed:", errText);
          showToast("Failed to send notification email (Service Error)", "error");
        }
      } catch (err) {
        console.error("Network error sending email:", err);
        showToast("Network error sending notification email", "error");
      }
    } else {
      console.warn("EmailJS credentials not set in .env. Falling back to console-only mode.");
      showToast(`Notification email simulated to ${email}`, 'success');
    }
  };

  const resetPassword = async (email) => {
    if (isMock) {
      console.log(`Mock Mode - Password reset requested for: ${email}`);
      showToast(`Mock Reset: Password reset link sent to ${email}`, 'success');
      return true;
    } else {
      await sendPasswordResetEmail(auth, email);
      showToast(`Password reset link sent to ${email}`, 'success');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isMock,
      notifications,
      markNotificationRead,
      clearAllNotifications,
      showToast,
      login,
      registerResident,
      registerArtisan,
      registerAdmin,
      logout,
      getJobs,
      getArtisans,
      ratings,
      getRatings,
      createJob,
      placeBid,
      hireArtisanForJob,
      completeJob,
      cancelJob,
      updateArtisanStatus,
      updateArtisanProfile,
      updateResidentProfile,
      submitRating,
      zones,
      addZone,
      supportMessages,
      sendSupportMessage,
      adminReplySupportMessage,
      resetPassword,
      sendNotificationEmail
    }}>
      {!loading && children}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[9999] transition-all duration-300 animate-slide-in">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold ${
            toast.type === 'error' 
              ? 'bg-rose-50 border-rose-150 text-rose-900' 
              : 'bg-emerald-50 border-emerald-150 text-emerald-900'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black ${
              toast.type === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {toast.type === 'error' ? '✕' : '✓'}
            </span>
            <div className="flex-1 min-w-[200px] text-left">
              <p className="text-slate-800 text-xs font-bold leading-normal">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)} 
              className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1 transition"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
