import firestore from '@react-native-firebase/firestore';
import { StepFlowResult, Step } from '../features/StepFlow/types'; // Adjusted path

// Define constants for collection names
const TESTS_COLLECTION = 'tests';
const USER_RESULTS_COLLECTION = 'userResults';

// Define a type for the test configuration document structure
type TestConfigDoc = {
  config: Step[]; // Assuming the JSON config is an array of Step objects
  // Add other potential fields if needed
};

export const stepFlowService = {
  // Fetches the configuration JSON for a specific test ID (e.g., 'SKIN', 'HAIR')
  getTestConfiguration: async (testId: string): Promise<Step[] | null> => {
    try {
      const docRef = firestore().collection(TESTS_COLLECTION).doc(testId);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const data = docSnap.data() as TestConfigDoc;
        // TODO: Implement schema validation (e.g., using Zod) for the fetched data
        // to ensure it matches the expected Step[] structure before returning.
        if (data && Array.isArray(data.config)) {
          return data.config;
        } else {
          console.warn(`Test configuration format error for testId: ${testId}. Data:`, data);
          // Consider throwing a more specific error or returning a structured error object
          return null;
        }
      } else {
        console.warn(`No test configuration found for testId: ${testId}`);
        return null; // Or throw a specific 'NotFound' error
      }
    } catch (error) {
      console.error(`Error fetching test configuration for ${testId}:`, error);
      // TODO: Consider implementing a dedicated error reporting service (e.g., Sentry)
      // Rethrow a more specific error to be handled by the caller
      throw new Error(`Failed to fetch test configuration for ${testId}.`);
    }
  },

  // Saves the final answers for a user
  // TODO: Replace placeholder userId with actual authenticated user ID
  saveAnswers: async (userId: string, answers: StepFlowResult) => {
    if (!userId) {
       console.error('Attempted to save answers without a userId.');
       // Or throw an error if userId is absolutely required
       return;
    }
    try {
      await firestore().collection(USER_RESULTS_COLLECTION).doc(userId).set({
        answers,
        completedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true }); // Use merge to update if doc exists
      console.log(`Answers saved for user: ${userId}`);
    } catch (error) {
      console.error(`Error saving answers for user ${userId}:`, error);
      // TODO: Consider implementing a dedicated error reporting service (e.g., Sentry)
      // Rethrow a more specific error
      throw new Error(`Failed to save answers for user ${userId}.`);
    }
  },
};