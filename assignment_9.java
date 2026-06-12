import java.util.ArrayList;
import java.util.List;
class Account {
private String accountNumber;
private String ownerName;
private double balance;

public Account(String accountNumber, String ownerName) {
this(accountNumber, ownerName, 0.0);
}
public Account(String accountNumber, String ownerName, double
initialBalance) {
if (accountNumber == null || accountNumber.isBlank())
throw new IllegalArgumentException("Account number cannot be
empty.");
if (ownerName == null || ownerName.isBlank())
throw new IllegalArgumentException("Owner name cannot be
empty.");
if (initialBalance < 0)
throw new IllegalArgumentException("Initial balance cannot
be negative.");
this.accountNumber = accountNumber;
this.ownerName = ownerName;
this.balance = initialBalance;
}

public String getAccountNumber() { return accountNumber; }
public String getOwnerName() { return ownerName; }
public double getBalance() { return balance; }
public void setOwnerName(String ownerName) {
if (ownerName == null || ownerName.isBlank())
throw new IllegalArgumentException("Owner name cannot
be empty.");
this.ownerName = ownerName;
}
protected void setBalance(double balance) {
this.balance = balance;
}
public void deposit(double amount) {
if (amount <= 0)
throw new IllegalArgumentException("Deposit amount must be
positive. Got: " + amount);
balance += amount;
System.out.println(" [Deposit] +" + amount + " -> New
balance: " + balance);
}
public void withdraw(double amount) {
if (amount <= 0)
throw new IllegalArgumentException("Withdrawal amount must
be positive. Got: " + amount);
if (amount > balance)
throw new IllegalStateException(
"Insufficient funds. Balance: " + balance + ",
Requested: " + amount);
balance -= amount;
System.out.println(" [Withdraw] -" + amount + " -> New
balance: " + balance);
}
public void display() {

System.out.println("------------------------------------------");
System.out.println(" Account Details");
System.out.println("------------------------------------------");
System.out.printf(" Account No : %s%n", accountNumber);
System.out.printf(" Owner : %s%n", ownerName);
System.out.printf(" Balance : %.2f%n", balance);
System.out.println("------------------------------------------");
}
}
class SavingsAccount extends Account {
private double interestRate;
// Constructor 1
public SavingsAccount(String accountNumber, String ownerName) {
this(accountNumber, ownerName, 0.0, 0.04);
}
// Constructor 2
public SavingsAccount(String accountNumber, String ownerName,
double initialBalance, double interestRate) {
super(accountNumber, ownerName, initialBalance);
if (interestRate < 0 || interestRate > 1)
throw new IllegalArgumentException("Interest rate must be
between 0 and 1.");
this.interestRate = interestRate;
}
public double getInterestRate() { return interestRate; }
public void setInterestRate(double interestRate) {
if (interestRate < 0 || interestRate > 1)
throw new IllegalArgumentException("Interest rate must be
between 0 and 1.");
this.interestRate = interestRate;

}
public double calculateInterest() {
return getBalance() * interestRate;
}
public void applyInterest() {
double interest = calculateInterest();
deposit(interest);
System.out.println(" [Interest Applied] Rate: " +
(interestRate * 100) + "%");
}
@Override
public void display() {
super.display();
System.out.println(" -- Savings Account Details --");
System.out.printf(" Interest Rate : %.2f%%%n", interestRate *
100);
System.out.printf(" Annual Interest: %.2f%n",
calculateInterest());
System.out.println("------------------------------------------");
}
}

class CurrentAccount extends Account {
private double overdraftLimit;
// Constructor 1
public CurrentAccount(String accountNumber, String ownerName) {
this(accountNumber, ownerName, 0.0, 5000.0);
}

// Constructor 2
public CurrentAccount(String accountNumber, String ownerName,
double initialBalance, double overdraftLimit)
{
super(accountNumber, ownerName, initialBalance);
if (overdraftLimit < 0)
throw new IllegalArgumentException("Overdraft limit cannot
be negative.");
this.overdraftLimit = overdraftLimit;
}
public double getOverdraftLimit() { return overdraftLimit; }
public void setOverdraftLimit(double overdraftLimit) {
if (overdraftLimit < 0)
throw new IllegalArgumentException("Overdraft limit cannot
be negative.");
this.overdraftLimit = overdraftLimit;
}
@Override
public void withdraw(double amount) {
if (amount <= 0)
throw new IllegalArgumentException("Withdrawal amount must
be positive. Got: " + amount);
double availableFunds = getBalance() + overdraftLimit;
if (amount > availableFunds)
throw new IllegalStateException(
"Exceeds overdraft limit. Available (balance +
overdraft): "
+ availableFunds + ", Requested: " + amount);
setBalance(getBalance() - amount);
System.out.println(" [Withdraw] -" + amount
+ " -> New balance: " + getBalance()
+ (getBalance() < 0 ? " (Using overdraft)" : ""));
}

@Override
public void display() {
super.display();
System.out.println(" -- Current Account Details --");
System.out.printf(" Overdraft Limit : %.2f%n", overdraftLimit);
System.out.printf(" Available Funds : %.2f%n", getBalance() +
overdraftLimit);
System.out.println("------------------------------------------");
}
}

public class BankingSystem {
public static void main(String[] args) {

System.out.println("==========================================");
System.out.println(" BANKING SYSTEM DEMO ");
System.out.println("==========================================\n");
SavingsAccount savings1 = new SavingsAccount("SAV001",
"Alice");
SavingsAccount savings2 = new SavingsAccount("SAV002", "Bob",
10000.0, 0.06);

CurrentAccount current1 = new CurrentAccount("CUR001",
"Charlie");

CurrentAccount current2 = new CurrentAccount("CUR002", "Diana",
2000.0, 8000.0);

List<Account> accounts = new ArrayList<>();
accounts.add(savings1);
accounts.add(savings2);
accounts.add(current1);
accounts.add(current2);

System.out.println(">> Alice's Savings Account (SAV001):");
savings1.deposit(5000);
savings1.deposit(3000);
savings1.withdraw(1000);
savings1.applyInterest();
System.out.println();
System.out.println(">> Bob's Savings Account (SAV002):");
savings2.withdraw(2000);
System.out.println();
System.out.println(">> Charlie's Current Account (CUR001):");
current1.deposit(1000);
current1.withdraw(500);
current1.withdraw(2000);
System.out.println();
System.out.println(">> Diana's Current Account (CUR002):");
current2.deposit(500);
System.out.println();

System.out.println("==========================================");
System.out.println(" ACCOUNT SUMMARY (Polymorphic display) ");
System.out.println("==========================================");
for (Account acc : accounts) {
acc.display();
System.out.println();
}

System.out.println("==========================================");
System.out.println(" VALIDATION / ERROR HANDLING DEMO ");
System.out.println("==========================================");
testException("Negative deposit", () ->
savings1.deposit(-500));
testException("Overdraft limit exceeded", () ->
current1.withdraw(10000));
testException("Zero withdrawal", () ->
savings2.withdraw(0));
testException("Invalid interest rate", () ->
new SavingsAccount("SAV003", "Eve", 1000, 1.5));

assert current1.getBalance() >= -current1.getOverdraftLimit()
: "Assertion failed: balance below overdraft limit!";
System.out.println("\nAll validations passed correctly.");
}
private static void testException(String scenario, Runnable action)
{
System.out.print(" [TEST] " + scenario + " -> ");
try {
action.run();
System.out.println("No exception thrown (unexpected!)");
} catch (IllegalArgumentException | IllegalStateException e) {
System.out.println("Exception caught OK (" +
e.getMessage() + ")");
}
}
}
