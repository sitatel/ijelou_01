import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { format } from 'date-fns';
import type { BillingRecord } from '../types';

const mockBillingRecords: BillingRecord[] = [
  {
    id: '1',
    clientId: '1',
    date: '2024-03-01T00:00:00Z',
    plan: 'Professional',
    amount: 299.99,
    status: 'paid',
    robots: 5,
    extraInteractions: 1000,
  },
  {
    id: '2',
    clientId: '1',
    date: '2024-02-01T00:00:00Z',
    plan: 'Professional',
    amount: 299.99,
    status: 'paid',
    robots: 5,
    extraInteractions: 800,
  },
];

export function BillingPage() {
  const [billingRecords] = useState<BillingRecord[]>(mockBillingRecords);

  return (
    <div className="space-y-6">
      <Card title="Current Plan">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
            <p className="text-gray-500">$299.99/month</p>
          </div>
          <Button variant="outline">Change Plan</Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Robots Included</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">5</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Monthly Interactions
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">10,000</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Extra Interactions</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              $0.01/each
            </p>
          </div>
        </div>
      </Card>

      <Card title="Billing History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Extra Interactions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(record.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${record.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.extraInteractions.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}