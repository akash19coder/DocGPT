export function generateUniqueID() {
	// Generate a random number and convert it to base 36 (which includes letters and digits)
	const randomID = Math.random().toString(36); // Adjust the length as needed

	// Get the current timestamp
	const timestamp = new Date().getTime();

	// Concatenate the random number and timestamp to create the unique ID
	const uniqueID = randomID + timestamp;

	return uniqueID;
}
