const admin = require('firebase-admin');

// --- Configuration ---
// Path to your downloaded service account key JSON file
const serviceAccount = require('./serviceAccountKey.json'); 
// Your Firestore database URL (usually not needed if using default)
// const databaseURL = "https://your-project-id.firebaseio.com"; 

// --- Data to Seed ---

// Define the full configuration for the SKIN test
const skinTestData = {
  config: [
    {
      id: "skin_q1",
      question: "What is your skin type?",
      type: "single",
      options: [
        { id: "skin_type_normal", label: "Normal" },
        { id: "skin_type_dry", label: "Dry" },
        { id: "skin_type_oily", label: "Oily" },
        { id: "skin_type_combination", label: "Combination" },
        { id: "skin_type_sensitive", label: "Sensitive" }
      ]
    },
    {
      id: "skin_q2",
      question: "Any concerns?",
      type: "multi",
      options: [
        { id: "skin_concern_acne", label: "Acne / Breakouts" },
        { id: "skin_concern_aging", label: "Fine Lines / Wrinkles" },
        { id: "skin_concern_pigmentation", label: "Dark Spots / Hyperpigmentation" },
        { id: "skin_concern_redness", label: "Redness / Rosacea" },
        { id: "skin_concern_dullness", label: "Dullness / Uneven Texture" },
        { id: "skin_concern_pores", label: "Enlarged Pores" },
        { id: "skin_concern_none", label: "None of the above" }
      ]
    },
    // --- Add more skin questions here ---
    {
      id: "skin_q3",
      question: "How does your skin feel after cleansing?",
      type: "single",
      options: [
        { id: "skin_feel_tight", label: "Tight and Dry" },
        { id: "skin_feel_comfortable", label: "Comfortable, not oily or dry" },
        { id: "skin_feel_oily", label: "Oily, especially in T-zone" },
        { id: "skin_feel_irritated", label: "Sometimes irritated or red" }
      ]
    },
    {
        id: "skin_q4",
        question: "How often do you experience breakouts?",
        type: "single",
        options: [
            { id: "breakout_rarely", label: "Rarely / Never" },
            { id: "breakout_monthly", label: "Occasionally / Monthly" },
            { id: "breakout_weekly", label: "Frequently / Weekly" },
            { id: "breakout_constant", label: "Constantly" }
        ]
    }
  ]
};

// Define the full configuration for the HAIR test
const hairTestData = {
  config: [
    {
      id: "hair_q1",
      question: "What is your hair type?",
      type: "single",
      options: [
        { id: "hair_type_straight", label: "Straight" },
        { id: "hair_type_wavy", label: "Wavy" },
        { id: "hair_type_curly", label: "Curly" },
        { id: "hair_type_coily", label: "Coily/Kinky" }
      ]
    },
    {
      id: "hair_q2",
      question: "What is your main hair concern?",
      type: "multi", // Allow multiple concerns
      options: [
        { id: "hair_concern_frizz", label: "Frizz" },
        { id: "hair_concern_dryness", label: "Dryness / Damage" },
        { id: "hair_concern_thinning", label: "Thinning / Hair Loss" },
        { id: "hair_concern_oily", label: "Oily Scalp" },
        { id: "hair_concern_dandruff", label: "Dandruff / Itchy Scalp" },
        { id: "hair_concern_volume", label: "Lack of Volume" },
        { id: "hair_concern_color", label: "Color Protection" }
      ]
    },
    // --- Add more hair questions here ---
     {
        id: "hair_q3",
        question: "How would you describe your scalp condition?",
        type: "single",
        options: [
            { id: "scalp_normal", label: "Normal" },
            { id: "scalp_dry", label: "Dry / Flaky" },
            { id: "scalp_oily", label: "Oily" },
            { id: "scalp_sensitive", label: "Sensitive / Itchy" }
        ]
    }
  ]
};


// --- Script Logic ---

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: databaseURL // Uncomment if needed
});

const db = admin.firestore();

async function seedDatabase() {
  console.log('Starting Firestore seeding...');

  try {
    // Get references to the documents
    const skinDocRef = db.collection('tests').doc('SKIN');
    const hairDocRef = db.collection('tests').doc('HAIR');

    // Update the documents (using set with merge: true or just set to overwrite)
    // Using set() will completely overwrite the document with the new data.
    // If you only wanted to update the 'config' field, you could use update().
    console.log('Updating SKIN document...');
    await skinDocRef.set(skinTestData); 
    console.log('SKIN document updated successfully.');

    console.log('Updating HAIR document...');
    await hairDocRef.set(hairTestData);
    console.log('HAIR document updated successfully.');

    console.log('Firestore seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1); // Exit with error code
  }
}

// Run the seeding function
seedDatabase();