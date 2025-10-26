import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import blueWatercolor from "../../assets/bluewatercolor.jpeg";

const EmergencyResources = () => {
  const { user, loading: userLoading } = useContext(UserContext);

  // Show loading while checking authentication
  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <div className="loading">Redirecting to login...</div>;
  }

  return (
    <div className="main-container">
      <div className="card">
        <h1 className="form-title">Emergency Resources</h1>
        <p className="welcome-description" style={{ textAlign: 'center', marginBottom: '30px' }}>
          If you're in immediate danger or need help right now, please use these resources:
        </p>

        <div className="emergency-section">
          <h2 style={{ color: '#4ecdc4', marginBottom: '15px' }}>Immediate Danger</h2>
          <div className="resource-item">
            <h3>National Domestic Violence Hotline</h3>
            <p className="phone-number">1-800-799-7233</p>
            <p className="resource-description">24/7 confidential support, available in 200+ languages</p>
          </div>

          <div className="resource-item">
            <h3>Emergency Services</h3>
            <p className="phone-number">911</p>
            <p className="resource-description">Call immediately if you're in immediate physical danger</p>
          </div>
        </div>

        <div className="emergency-section">
          <h2 style={{ color: '#4ecdc4', marginBottom: '15px' }}>Support & Counseling</h2>
          <div className="resource-item">
            <h3>National Sexual Assault Hotline</h3>
            <p className="phone-number">1-800-656-4673</p>
            <p className="resource-description">24/7 confidential support for survivors</p>
          </div>

          <div className="resource-item">
            <h3>Crisis Text Line</h3>
            <p className="phone-number">Text HOME to 741741</p>
            <p className="resource-description">24/7 crisis support via text message</p>
          </div>

          <div className="resource-item">
            <h3>National Suicide Prevention Lifeline</h3>
            <p className="phone-number">988</p>
            <p className="resource-description">24/7 confidential support for anyone in distress</p>
          </div>
        </div>

        <div className="emergency-section">
          <h2 style={{ color: '#4ecdc4', marginBottom: '15px' }}>Local Resources</h2>
          <div className="resource-item">
            <h3>Local Domestic Violence Shelter</h3>
            <p className="phone-number">Contact your local 211 or 311</p>
            <p className="resource-description">Find shelters and support services in your area</p>
          </div>

          <div className="resource-item">
            <h3>Legal Aid</h3>
            <p className="phone-number">1-888-534-5243</p>
            <p className="resource-description">Free legal assistance for domestic violence cases</p>
          </div>
        </div>

        <div className="emergency-section">
          <h2 style={{ color: '#4ecdc4', marginBottom: '15px' }}>Online Resources</h2>
          <div className="resource-item">
            <h3>National Domestic Violence Website</h3>
            <p className="website-link">thehotline.org</p>
            <p className="resource-description">Online chat, safety planning, and resources</p>
          </div>

          <div className="resource-item">
            <h3>RAINN (Rape, Abuse & Incest National Network)</h3>
            <p className="website-link">rainn.org</p>
            <p className="resource-description">Online hotline and resources for survivors</p>
          </div>
        </div>

        <div 
          className="safety-note"
          style={{
            backgroundImage: `url(${blueWatercolor})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(150, 206, 180, 0.6)',
            borderRadius: '8px',
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ color: '#96ceb4', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Safety Note</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
              If you're using this app on a shared device, please clear your browser history after viewing this page. 
              Your safety is the most important thing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResources;
