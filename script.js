// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // THEME PREFERENCES WITH LOCALSTORAGE
    // ==========================================
    
    // Theme switching functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Load saved theme preference from localStorage on page load
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) {
            document.body.className = ''; // Remove any existing theme classes
            document.body.classList.add(`theme-${savedTheme}`);
            console.log(`Loaded theme: ${savedTheme}`);
        }
    }
    
    // Save theme preference to localStorage
    function saveThemePreference(theme) {
        localStorage.setItem('themePreference', theme);
        console.log(`Saved theme: ${theme}`);
    }
    
    // Add click event to each theme button
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = ''; // Remove any existing theme classes
            
            // If not the default blue theme, add the appropriate class
            if (theme !== 'blue') {
                document.body.classList.add(`theme-${theme}`);
            }
            
            // Save preference to localStorage
            saveThemePreference(theme);
            
            // Add animation feedback
            animateButton(this);
        });
    });
    
    // Animation feedback for button click
    function animateButton(button) {
        button.classList.add('pulse-animation');
        setTimeout(() => {
            button.classList.remove('pulse-animation');
        }, 500);
    }
    
    // Load theme preference when page loads
    loadThemePreference();
    
    
    // ==========================================
    // CARD ANIMATIONS AND INTERACTIONS
    // ==========================================
    
    // Card 2 - Click Animation
    const card2 = document.getElementById('card2');
    
    card2.addEventListener('click', function() {
        // Add the pulse animation class
        this.classList.add('pulse-animation');
        
        // Remove the class after animation completes to allow it to be triggered again
        setTimeout(() => {
            this.classList.remove('pulse-animation');
        }, 500);
    });
    
    
    // ==========================================
    // USER PROFILE WITH LOCALSTORAGE
    // ==========================================
    
    const usernameInput = document.getElementById('username');
    const displayNameInput = document.getElementById('display-name');
    const bioInput = document.getElementById('bio');
    const colorOptions = document.querySelectorAll('.color-option');
    const saveProfileBtn = document.getElementById('save-profile');
    const clearProfileBtn = document.getElementById('clear-profile');
    
    // Profile display elements
    const avatarElement = document.querySelector('.avatar');
    const avatarInitial = document.getElementById('avatar-initial');
    const displayUsername = document.getElementById('display-username');
    const displayDisplayName = document.getElementById('display-displayname');
    const displayBio = document.getElementById('display-bio');
    
    let selectedColor = '#3498db'; // Default color
    
    // Select color option
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected color
            selectedColor = this.getAttribute('data-color');
        });
    });
    
    // Save profile to localStorage
    saveProfileBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const displayName = displayNameInput.value.trim();
        const bio = bioInput.value.trim();
        
        if (!username) {
            alert('Username is required');
            return;
        }
        
        // Create profile object
        const userProfile = {
            username: username,
            displayName: displayName || username,
            bio: bio || 'No bio provided',
            avatarColor: selectedColor,
            lastUpdated: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        // Update the profile display
        updateProfileDisplay(userProfile);
        
        // Animate the avatar
        animateAvatar();
        
        // Provide feedback
        alert('Profile saved successfully!');
    });
    
    // Clear profile from localStorage
    clearProfileBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your profile?')) {
            localStorage.removeItem('userProfile');
            
            // Reset the form
            usernameInput.value = '';
            displayNameInput.value = '';
            bioInput.value = '';
            
            // Reset color selection
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            colorOptions[0].classList.add('selected');
            selectedColor = colorOptions[0].getAttribute('data-color');
            
            // Reset the display
            displayUsername.textContent = 'Not set';
            displayDisplayName.textContent = 'Not set';
            displayBio.textContent = 'No bio provided';
            avatarInitial.textContent = '?';
            avatarElement.style.backgroundColor = '#3498db';
            
            // Provide feedback
            alert('Profile cleared successfully!');
        }
    });
    
    // Update profile display
    function updateProfileDisplay(profile) {
        displayUsername.textContent = profile.username;
        displayDisplayName.textContent = profile.displayName;
        displayBio.textContent = profile.bio;
        
        // Set avatar initial and color
        avatarInitial.textContent = profile.displayName.charAt(0).toUpperCase();
        avatarElement.style.backgroundColor = profile.avatarColor;
    }
    
    // Animate avatar
    function animateAvatar() {
        avatarElement.classList.add('animate');
        setTimeout(() => {
            avatarElement.classList.remove('animate');
        }, 500);
    }
    
    // Load user profile on page load
    function loadUserProfile() {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            
            // Fill form fields
            usernameInput.value = profile.username;
            displayNameInput.value = profile.displayName;
            bioInput.value = profile.bio;
            
            // Select the correct color option
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            const matchingOption = Array.from(colorOptions).find(
                opt => opt.getAttribute('data-color') === profile.avatarColor
            );
            
            if (matchingOption) {
                matchingOption.classList.add('selected');
                selectedColor = profile.avatarColor;
            }
            
            // Update profile display
            updateProfileDisplay(profile);
        }
    }
    
    // Load profile on page load
    loadUserProfile();
    
    
    // ==========================================
    // CUSTOM ANIMATION CONTROLLER
    // ==========================================
    
    const speedControl = document.getElementById('speed-control');
    const sizeControl = document.getElementById('size-control');
    const speedValue = document.getElementById('speed-value');
    const sizeValue = document.getElementById('size-value');
    const startAnimationBtn = document.getElementById('start-animation');
    const stopAnimationBtn = document.getElementById('stop-animation');
    const animationTarget = document.getElementById('animation-target');
    
    // Update displays for range inputs
    speedControl.addEventListener('input', function() {
        speedValue.textContent = `${this.value}x`;
        
        // Save to localStorage
        saveAnimationPreferences();
        
        // Update animation if it's running
        if (animationTarget.classList.contains('animate')) {
            updateAnimation();
        }
    });
    
    sizeControl.addEventListener('input', function() {
        sizeValue.textContent = `${this.value}%`;
        
        // Update element size
        const size = `${this.value}px`;
        animationTarget.style.width = size;
        animationTarget.style.height = size;
        
        // Save to localStorage
        saveAnimationPreferences();
    });
    
    // Start animation
    startAnimationBtn.addEventListener('click', function() {
        animationTarget.classList.add('animate');
        updateAnimation();
    });
    
    // Stop animation
    stopAnimationBtn.addEventListener('click', function() {
        animationTarget.classList.remove('animate');
    });
    
    // Update animation with current speed
    function updateAnimation() {
        const speed = 4 / speedControl.value; // Invert the value for animation duration
        const animationStyle = document.createElement('style');
        
        animationStyle.textContent = `
            #animation-target.animate {
                animation: moveRocket ${speed}s linear infinite;
            }
        `;
        
        // Remove any previous animation styles
        const oldStyles = document.querySelectorAll('style[data-animation-style]');
        oldStyles.forEach(style => style.remove());
        
        // Add data attribute for easy removal later
        animationStyle.setAttribute('data-animation-style', 'true');
        
        // Add new style to the document
        document.head.appendChild(animationStyle);
    }
    
    // Save animation preferences to localStorage
    function saveAnimationPreferences() {
        const preferences = {
            speed: speedControl.value,
            size: sizeControl.value
        };
        
        localStorage.setItem('animationPreferences', JSON.stringify(preferences));
    }
    
    // Load animation preferences
    function loadAnimationPreferences() {
        const savedPreferences = localStorage.getItem('animationPreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            speedControl.value = preferences.speed;
            sizeControl.value = preferences.size;
            
            // Update displays
            speedValue.textContent = `${preferences.speed}x`;
            sizeValue.textContent = `${preferences.size}%`;
            
            // Update element size
            const size = `${preferences.size}px`;
            animationTarget.style.width = size;
            animationTarget.style.height = size;
        }
    }
    
    // Load animation preferences on page load
    loadAnimationPreferences();
    
    // Log that localStorage is being used (for educational purposes)
    console.log('localStorage items:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
});