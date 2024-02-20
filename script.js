// Concept 1: Dynamic Memory Allocation (Arrays)
const masterPassword = "risheek"; // Replace with your desired master password
let authenticated = false;

// Concept 2: Linked Lists
function LinkedListNode(accountName, password) {
    this.accountName = accountName;
    this.password = password;
    this.next = null;
}

// Concept 1: Dynamic Memory Allocation (Arrays)
const passwordLists = [];

// Concept 4: Stacks
const passwordChangeHistory = [];

// Concept 5: Queues
const passwordRecoveryQueue = [];

function authenticate() {
    const passwordInput = document.getElementById("masterPassword").value;

    if (passwordInput === masterPassword) {
        authenticated = true;
        document.getElementById("passwordList").style.display = "block";
    } else {
        alert("Incorrect master password. Please try again.");
    }
}

function getPassword() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;
        const passwordList = passwordLists.find(list => list.head.accountName === accountName);

        if (passwordList) {
            alert(`Password for ${accountName}: ${passwordList.head.password}`);
        } else {
            alert(`No password found for ${accountName}.`);
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

function addAccount() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;
        const newPassword = prompt(`Enter password for ${accountName}:`);

        if (newPassword !== null) {
            const newNode = new LinkedListNode(accountName, newPassword);

            const passwordList = passwordLists.find(list => list.head.accountName === accountName);

            if (passwordList) {
                let current = passwordList.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            } else {
                passwordLists.push({
                    head: newNode,
                });
            }

            // Concept 4: Stacks
            passwordChangeHistory.push({ accountName, newPassword });

            alert(`Password for ${accountName} added successfully.`);
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

// Additional Feature: Show All Accounts
function showAllAccounts() {
    if (authenticated) {
        const allAccounts = passwordLists.map(list => {
            return list.head.accountName;
        });

        alert("All Accounts:\n" + allAccounts.join(', '));
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

// Additional Feature: Show Previous Passwords
function showPreviousPasswords() {
    if (authenticated) {
        const passwordChangeHistoryCopy = [...passwordChangeHistory];

        if (passwordChangeHistoryCopy.length > 0) {
            const formattedHistory = passwordChangeHistoryCopy.map((change, index) => {
                return `Account: ${change.accountName}, ${index % 2 === 0 ? 'Previous' : 'Current'} Password: ${change.newPassword}`;
            });

            alert("Previous and Current Passwords:\n" + formattedHistory.join('\n'));
        } else {
            alert("No previous password changes.");
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}



// Additional Feature: Update Password
function updatePassword() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;
        const newPassword = prompt(`Enter new password for ${accountName}:`);

        if (newPassword !== null) {
            const passwordList = passwordLists.find(list => list.head.accountName === accountName);

            if (passwordList) {
                passwordChangeHistory.push({ accountName, newPassword });

                // Update the password in the linked list
                passwordList.head.password = newPassword;

                alert(`Password for ${accountName} updated successfully.`);
            } else {
                alert(`No account found for ${accountName}.`);
            }
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}
