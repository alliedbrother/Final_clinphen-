export const calculateMatchPercentage = (user, testerCriteria) => {
    let matchScore = 0;
    let totalCriteria = 0;
  
    if (testerCriteria.age) {
      totalCriteria++;
      if (user.age === testerCriteria.age) {
        matchScore++;
      }
    }
  
    if (testerCriteria.gender) {
      totalCriteria++;
      if (user.gender === testerCriteria.gender) {
        matchScore++;
      }
    }
  
    // Add more criteria as needed
    // ...
  
    return (matchScore / totalCriteria) * 100;
  };
  
  export const findMatches = (users, testers, userAcceptances, testerAcceptances) => {
    const matches = [];
  
    users.forEach((user) => {
      testers.forEach((tester) => {
        if (userAcceptances[user.name][tester.trial] && testerAcceptances[tester.trial][user.name]) {
          const matchPercentage = calculateMatchPercentage(user, tester.criteria);
          matches.push({
            user,
            tester,
            matchPercentage,
            timestamp: new Date().getTime(), // Add timestamp
          });
        }
      });
    });
  
    // Sort matches by matchPercentage (descending) and timestamp (descending)
    matches.sort((a, b) => {
      if (b.matchPercentage === a.matchPercentage) {
        return b.timestamp - a.timestamp;
      }
      return b.matchPercentage - a.matchPercentage;
    });
  
    return matches;
  };