import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import {
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  EyeIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'

const Wallet = () => {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [walletData, setWalletData] = useState({
    balance: 2847.50,
    pendingEarnings: 425.00,
    totalEarnings: 15420.75,
    monthlyEarnings: 1250.00,
    transactions: [],
    paymentMethods: [],
    autoPayments: true,
    transferSchedule: 'weekly'
  })

  useEffect(() => {
    generateMockWalletData()
  }, [])

  const generateMockWalletData = () => {
    const mockTransactions = [
      {
        id: 1,
        type: 'earning',
        description: 'Session with Sarah Chen - React Advanced Patterns',
        amount: 75.00,
        date: '2024-12-17',
        status: 'completed',
        sessionId: 'SES-001'
      },
      {
        id: 2,
        type: 'withdrawal',
        description: 'Bank Transfer to Chase ****1234',
        amount: -500.00,
        date: '2024-12-16',
        status: 'completed',
        reference: 'TXN-WD-001'
      },
      {
        id: 3,
        type: 'earning',
        description: 'Session with Mike Johnson - JavaScript ES6+',
        amount: 100.00,
        date: '2024-12-15',
        status: 'pending',
        sessionId: 'SES-002'
      },
      {
        id: 4,
        type: 'earning',
        description: 'Session with Emma Davis - Node.js Backend',
        amount: 150.00,
        date: '2024-12-14',
        status: 'completed',
        sessionId: 'SES-003'
      },
      {
        id: 5,
        type: 'refund',
        description: 'Refund for cancelled session',
        amount: -50.00,
        date: '2024-12-13',
        status: 'completed',
        reference: 'REF-001'
      }
    ]

    const mockPaymentMethods = [
      {
        id: 1,
        type: 'bank',
        name: 'Chase Bank',
        details: '****1234',
        primary: true,
        verified: true
      },
      {
        id: 2,
        type: 'paypal',
        name: 'PayPal',
        details: 'user@example.com',
        primary: false,
        verified: true
      }
    ]

    setWalletData(prev => ({
      ...prev,
      transactions: mockTransactions,
      paymentMethods: mockPaymentMethods
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Wallet & Payments</h1>
          <p className="text-text-secondary">Manage your earnings and payment methods</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-button text-sm">
            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
            Export Statement
          </button>
          <button className="glass-button text-sm bg-primary/20 border-primary/30 text-primary">
            <ArrowDownIcon className="w-4 h-4 mr-2" />
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
            </div>
            <ArrowUpIcon className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-text-primary">${walletData.balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <ClockIcon className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium mb-1">Pending Earnings</p>
            <p className="text-2xl font-bold text-text-primary">${walletData.pendingEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <BanknotesIcon className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowUpIcon className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-text-primary">${walletData.totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
              <ArrowUpIcon className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xs text-green-400">+15.2%</span>
          </div>
          <div>
            <p className="text-text-secondary text-sm font-medium mb-1">This Month</p>
            <p className="text-2xl font-bold text-text-primary">${walletData.monthlyEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Payment Methods & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Payment Methods</h2>
            <button className="text-xs text-primary hover:text-primary/80">Add Method</button>
          </div>

          <div className="space-y-3">
            {walletData.paymentMethods.map((method) => (
              <div key={method.id} className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      method.type === 'bank' ? 'bg-blue-400/20' : 'bg-yellow-400/20'
                    }`}>
                      {method.type === 'bank' ? (
                        <BanknotesIcon className={`w-5 h-5 ${method.type === 'bank' ? 'text-blue-400' : 'text-yellow-400'}`} />
                      ) : (
                        <CreditCardIcon className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{method.name}</p>
                      <p className="text-sm text-text-secondary">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.verified && (
                      <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    )}
                    {method.primary && (
                      <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto Payment Settings */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Auto Payment Settings</h2>
            <button className="text-xs text-primary hover:text-primary/80">Configure</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-glass-bg/30">
              <div>
                <p className="font-medium text-text-primary">Auto Payments</p>
                <p className="text-sm text-text-secondary">Automatically transfer earnings</p>
              </div>
              <div className={`w-12 h-6 rounded-full ${walletData.autoPayments ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${walletData.autoPayments ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-glass-bg/30">
              <p className="font-medium text-text-primary mb-2">Transfer Schedule</p>
              <select className="glass-input w-full text-sm">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="p-3 rounded-lg bg-glass-bg/30">
              <p className="font-medium text-text-primary mb-2">Minimum Transfer Amount</p>
              <input
                type="number"
                placeholder="100.00"
                className="glass-input w-full text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass-panel p-6 rounded-xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Transaction History</h2>
          <button className="text-xs text-primary hover:text-primary/80">View All</button>
        </div>

        <div className="space-y-3">
          {walletData.transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-glass-bg/30 border border-glass-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'earning' ? 'bg-green-400/20' :
                  transaction.type === 'withdrawal' ? 'bg-blue-400/20' :
                  'bg-red-400/20'
                }`}>
                  {transaction.type === 'earning' ? (
                    <ArrowUpIcon className="w-5 h-5 text-green-400" />
                  ) : transaction.type === 'withdrawal' ? (
                    <ArrowDownIcon className="w-5 h-5 text-blue-400" />
                  ) : (
                    <ArrowPathIcon className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{transaction.description}</p>
                  <p className="text-sm text-text-secondary">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                    transaction.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {transaction.status}
                  </span>
                  <button className="p-1 rounded hover:bg-glass-hover transition-colors">
                    <EyeIcon className="w-3 h-3 text-text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wallet
