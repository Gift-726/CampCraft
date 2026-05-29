import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
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
};

const getMockData = (key) => JSON.parse(localStorage.getItem(key));
const saveMockData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export function AuthProvider({ children }) {
  const [isMock] = useState(() => isFirebaseMock());
  
  const [currentUser, setCurrentUser] = useState(() => {
    if (isFirebaseMock()) {
      initMockDatabase();
      const savedUser = localStorage.getItem('cc_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [jobs, setJobs] = useState(() => {
    if (isFirebaseMock()) {
      initMockDatabase();
      return getMockData('cc_jobs');
    }
    return [];
  });

  const [artisans, setArtisans] = useState(() => {
    if (isFirebaseMock()) {
      initMockDatabase();
      return getMockData('cc_artisans');
    }
    return [];
  });

  const [ratings, setRatings] = useState(() => {
    if (isFirebaseMock()) {
      initMockDatabase();
      return getMockData('cc_ratings');
    }
    return [];
  });

  const [loading, setLoading] = useState(() => !isFirebaseMock());

  useEffect(() => {
    if (isMock) return;
    try {
      const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              ...userDoc.data()
            });
          } else {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              role: 'resident'
            });
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("Firebase auth error:", error);
        setLoading(false);
      });

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

      return () => {
        unsubscribeAuth();
        unsubscribeJobs();
        unsubscribeArtisans();
        unsubscribeRatings();
      };
    } catch (err) {
      console.error("Firebase initialization failed.", err);
      setTimeout(() => setLoading(false), 0);
    }
  }, [isMock]);

  // --- AUTH ACTIONS ---

  const login = async (email, password) => {
    // Helper: try mock login
    const tryMockLogin = (emailKey) => {
      initMockDatabase();
      const mockUsers = getMockData('cc_users');
      const user = mockUsers[emailKey];
      if (user) {
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
          ...userData
        };
        setCurrentUser(fullUser);
        return fullUser;
      } catch (firebaseErr) {
        // If user doesn't exist in Firebase yet, fall back to mock database
        // This allows demo accounts to work even when Firebase Auth is connected
        const code = firebaseErr?.code || '';
        if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          const user = tryMockLogin(email.toLowerCase());
          if (user) return user;
        }
        // Re-throw with a friendlier message
        throw new Error(
          code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password'
            ? 'Invalid email or password. Check your credentials and try again.'
            : firebaseErr.message
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
      
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
      return newUser;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, payload);
      const fullUser = { uid: userCredential.user.uid, ...payload };
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
      
      setCurrentUser(newUser);
      localStorage.setItem('cc_current_user', JSON.stringify(newUser));
      return newUser;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, payload);
      const fullUser = { uid: userCredential.user.uid, ...payload };
      setCurrentUser(fullUser);
      return fullUser;
    }
  };

  const logout = async () => {
    if (isMock) {
      setCurrentUser(null);
      localStorage.removeItem('cc_current_user');
    } else {
      await signOut(auth);
      setCurrentUser(null);
    }
  };

  // --- DATABASE READS & WRITES ---

  const getJobs = () => jobs;
  const getArtisans = () => artisans;
  const getRatings = () => ratings;

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
      await addDoc(collection(db, 'jobs'), newJob);
    }
  };

  const placeBid = async (jobId, bidData) => {
    if (isMock) {
      const updated = jobs.map(j => {
        if (j.id === jobId) {
          const cleanBids = j.bids.filter(b => b.artisanId !== bidData.artisanId);
          return {
            ...j,
            bids: [...cleanBids, { ...bidData, createdAt: Date.now() }]
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
        const updatedBids = [...cleanBids, { ...bidData, createdAt: Date.now() }];
        await updateDoc(jobRef, { bids: updatedBids });
      }
    }
  };

  const hireArtisanForJob = async (jobId, artisanId, price) => {
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
          const currentTotal = art.ratingAverage * art.ratingCount;
          const newCount = art.ratingCount + 1;
          const newAvg = Number(((currentTotal + ratingData.rating) / newCount).toFixed(1));
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
        const currentTotal = (art.ratingAverage || 0) * (art.ratingCount || 0);
        const newCount = (art.ratingCount || 0) + 1;
        const newAvg = Number(((currentTotal + ratingData.rating) / newCount).toFixed(1));
        await updateDoc(artisanRef, {
          ratingAverage: newAvg,
          ratingCount: newCount
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isMock,
      login,
      registerResident,
      registerArtisan,
      registerAdmin,
      logout,
      getJobs,
      getArtisans,
      getRatings,
      createJob,
      placeBid,
      hireArtisanForJob,
      completeJob,
      cancelJob,
      updateArtisanStatus,
      updateArtisanProfile,
      updateResidentProfile,
      submitRating
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
