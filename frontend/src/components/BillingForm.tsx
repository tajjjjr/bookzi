import { ChevronRight, ArrowLeft } from "lucide-react";
import { Input } from "./Input";
import { Select } from "./Select";

export const BillingForm = () => {
  return (
    <div className="flex-1 lg:max-w-3xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-12">
        <a href="/shop/cart" className="hover:text-[#CFFF24] cursor-pointer">Cart</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Information</span>
        <ChevronRight className="w-4 h-4" />
        <span>Payment</span>
      </div>

      <a
        href="/shop/cart"
        className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--accent)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Cart
      </a>

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        <span className="text-[var(--accent)]">Billing</span> Details
      </h2>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name*" placeholder="Enter your first name" />
          <Input label="Last Name*" placeholder="Enter your last name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email*"
            type="email"
            placeholder="john-doe@example.com"
          />
          <Input
            label="Phone number*"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="City*"
            placeholder="San Francisco"
            className="md:col-span-1"
          />
          <Select label="Country/Region*" className="md:col-span-1">
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Tanzania</option>
          </Select>
          <Input
            label="Zip Code*"
            placeholder="94103"
            className="md:col-span-1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-400">
            Notes (Optional)
          </label>
          <textarea
            placeholder="Any specific requests for the invoice..."
            className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#CFFF24] focus:ring-1 focus:ring-[#CFFF24] transition-all placeholder-gray-600 min-h-[100px]"
          ></textarea>
        </div>

        {/* License / Delivery Method Section */}
        {/* <div className="pt-8">
          <h3 className="text-lg font-semibold text-white mb-4">License Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioOption 
              selected={licenseType === 'personal'}
              onSelect={() => setLicenseType('personal')}
              title="Personal License"
              subtitle="Single user access"
              price="$0.00"
            />
            <RadioOption 
              selected={licenseType === 'team'}
              onSelect={() => setLicenseType('team')}
              title="Team License"
              subtitle="Up to 5 team members"
              price="+$149.00"
            />
          </div>
        </div> */}
      </form>
    </div>
  );
};
