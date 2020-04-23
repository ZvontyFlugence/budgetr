import React from 'react';
import { Page, Text, View, Document, StyleSheet, Canvas } from '@react-pdf/renderer';

// Create Styling for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#222222',
    color: '#71db77'
  },
  heading: {
    margin: 10,
    textAlign: 'right',
    fontSize: 12,
  },
  title: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statement: {
    margin: '5vw',
    marginTop: 0,
    marginBottom: '10vh',
    width: '90vw',
    height: 500,
  },
  text_col: {
    flexDirection: 'column',
    marginLeft: 10,
    textDecoration: 'underline',
  },
  text_sub: {
    fontSize: 12,
    margin: 10,
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
  },
  text_sm: {
    fontSize: 12,
    textDecoration: 'none',
    marginLeft: 10,
  }
});

// Create PDF Document
function Report(props) {

  const user = props.user;
  const date = new Date(Date.now());
  const primary = '#71db77';

  let expenses = [];
  user.categories.forEach(cat => {
    expenses = [...expenses, ...cat.expenses];
  });
  
  const sortTransactions = (a, b) => {
    let aDate = new Date(Date.parse(a[0]));
    let bDate = new Date(Date.parse(b[0]));

    return aDate < bDate ? aDate : bDate;
  }

  const transactions = [ ...expenses, ...user.income, ...user.savings ].sort((a, b) => sortTransactions(a, b));

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.heading}>
          <Text>Account User: {user.username}</Text>
          <Text>Account Email: {user.email}</Text>
          <Text>Report Date: {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</Text>
          <Text render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} fixed />
        </View>
        <View style={styles.title}>
          <Text>Budgetr Account Statement Report</Text>
        </View>
        <View style={styles.text_sub}>
          <Text>Below you will find a break down of your budget. Should you notice any discrepancies, please contact support@budgetr.com for assistance.</Text>
        </View>
        <View style={styles.text_sub}>
          <Text>Total Expenses: ${user.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <Text>Total Income: ${user.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <Text>Total Savings: ${user.totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.text_col}>
            <Text>Expenses By Category:</Text>
            {user.categories.map((cat, id) => (
              <View key={id} style={styles.text_col}>
                <Text style={{fontSize: 14}}>{cat.name}:</Text>
                {cat.expenses.map((exp, idx) => {
                  let d = new Date(Date.parse(exp.date.replace(/-/g, '/')));
                  return (
                    <Text key={idx} style={styles.text_sm}>
                      {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}
                      {` ${exp.item}`}
                      {` $${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    </Text>
                  );
                })}
              </View>
            ))}
        </View>
        <View style={styles.text_col}>
          <Text>Income:</Text>
          {user.income.map((inc, id) => {
            let d = new Date(Date.parse(inc.date[0].replace(/-/g, '/')));
            return (
              <Text key={id} style={styles.text_sm}>
                {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}
                {` ${inc.name}`}
                {` $${inc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </Text>
            );
          })}
        </View>
        <View style={styles.text_col}>
          <Text>Savings:</Text>
          {user.savings.map((sav, id) => {
            let d = new Date(Date.parse(sav.date[0].replace(/-/g, '/')));
            return (
              <Text key={id} style={styles.text_sm}>
                {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}
                {` ${sav.name}`}
                {` $${sav.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </Text>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

export default Report;

