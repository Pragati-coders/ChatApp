import React, { useEffect } from "react";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/chats");
  }, [navigate]);

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
      }}
    >
      {/* Animated background orbs */}
      <Box
        position="absolute"
        top="-100px"
        left="-100px"
        w="400px"
        h="400px"
        borderRadius="full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          animation: "float1 8s ease-in-out infinite",
        }}
      />
      <Box
        position="absolute"
        bottom="-150px"
        right="-100px"
        w="500px"
        h="500px"
        borderRadius="full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="60%"
        w="300px"
        h="300px"
        borderRadius="full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          animation: "float1 12s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(99,102,241,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        }

        .chat-card {
          animation: fadeSlideUp 0.8s ease forwards;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .title-card {
          animation: fadeSlideUp 0.6s ease forwards;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #34d399);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .tab-custom [aria-selected="true"] {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          color: white !important;
          box-shadow: 0 4px 15px rgba(99,102,241,0.4) !important;
        }

        .tab-custom [role="tab"] {
          color: rgba(255,255,255,0.5) !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 500 !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
        }

        .tab-custom [role="tab"]:hover {
          color: rgba(255,255,255,0.8) !important;
          background: rgba(255,255,255,0.06) !important;
        }

        /* Override Chakra inputs */
        .dark-input input, .dark-input textarea {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: white !important;
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          transition: all 0.3s ease !important;
        }
        .dark-input input:focus {
          border-color: rgba(99,102,241,0.6) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
          background: rgba(255,255,255,0.09) !important;
        }
        .dark-input input::placeholder {
          color: rgba(255,255,255,0.25) !important;
        }
        .dark-input label {
          color: rgba(255,255,255,0.6) !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
        }
        .dark-input button[type="button"] {
          color: rgba(255,255,255,0.5) !important;
          background: transparent !important;
        }

        .login-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          border: none !important;
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35) !important;
        }
        .login-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 30px rgba(99,102,241,0.5) !important;
        }

        .guest-btn {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 12px !important;
          color: rgba(255,255,255,0.7) !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
        }
        .guest-btn:hover {
          background: rgba(255,255,255,0.1) !important;
          color: white !important;
          transform: translateY(-1px) !important;
        }

        .tab-panel-wrap {
          color: white;
        }

        .icon-pulse {
          display: inline-block;
          animation: pulse-ring 2.5s ease infinite;
          border-radius: 50%;
          padding: 4px;
        }

        .tab-list-wrap {
          background: rgba(255,255,255,0.04) !important;
          border-radius: 14px !important;
          padding: 4px !important;
          border: 1px solid rgba(255,255,255,0.06) !important;
        }
      `}</style>

      <Container maxW="md" centerContent pt="60px" pb="40px" position="relative" zIndex={1}>

        {/* Header Card */}
        <Box className="title-card" w="100%" p={6} mb={4} textAlign="center">
          <Text
            fontSize="14px"
            letterSpacing="4px"
            textTransform="uppercase"
            color="rgba(255,255,255,0.3)"
            fontFamily="'DM Sans', sans-serif"
            mb={2}
          >
            Welcome to
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
            <span className="icon-pulse" style={{ fontSize: "32px" }}>💬</span>
            <Text
              fontSize="42px"
              fontFamily="'Syne', sans-serif"
              fontWeight="800"
              className="gradient-text"
              lineHeight="1"
            >
              ChatApp
            </Text>
          </Box>
          <Text
            fontSize="13px"
            color="rgba(255,255,255,0.25)"
            fontFamily="'DM Sans', sans-serif"
            mt={2}
            letterSpacing="0.5px"
          >
            Real-time messaging • Group chats • Instant notifications
          </Text>
        </Box>

        {/* Main Card */}
        <Box className="chat-card" w="100%" p={7}>
          <Tabs isFitted variant="unstyled" className="tab-custom">
            <TabList className="tab-list-wrap" mb={6}>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels className="tab-panel-wrap">
              <TabPanel p={0} className="dark-input">
                <Login />
              </TabPanel>
              <TabPanel p={0} className="dark-input">
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Footer */}
        <Text
          mt={6}
          fontSize="12px"
          color="rgba(255,255,255,0.15)"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.5px"
        >
          Built with MERN Stack + Socket.io
        </Text>

      </Container>
    </Box>
  );
};

export default Homepage;