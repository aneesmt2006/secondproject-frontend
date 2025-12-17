import DoctorCard from '@/features/doctorMain/components/DoctorCard'
import { Lock, Mail, Stethoscope } from 'lucide-react'
import DoctorInput from '@/features/doctorMain/components/DoctorInput'
import DoctorButton from '@/features/doctorMain/components/DoctorButton'
import useDrlogin from '@/features/dr.login/hooks/useDrlogin'
import { LoginProps } from '@/features/dr.login/types/dr.type'

const Drlogin:React.FC<LoginProps> = ({handleSubmitLogin,role}) => {
  const {handleChange,handleSubmit,isLoading,errors,formData} = useDrlogin({handleSubmitLogin,role})
  return (
   <>
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#C8DAF9] via-white to-[#E8F0FE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <DoctorCard shadow="lg" padding="lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A0F3C] rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#0A0F3C] mb-2">{role==='doctor'?'Doctor':'Admin'} Portal</h1>
            <p className="text-[#2C5DA9]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )} */}

            <DoctorInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              icon={<Mail size={20} />}
            />

            <DoctorInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              icon={<Lock size={20} />}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                //   checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#2C5DA9] border-[#C8DAF9] rounded focus:ring-2 focus:ring-[#2C5DA9] cursor-pointer"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>

              <a
                href="/doctor/forgot-password"
                className="text-sm text-[#2C5DA9] hover:text-[#0A0F3C] font-semibold transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <DoctorButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </DoctorButton>

            <div className="text-center pt-4">
              { role==='doctor' && <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/doctor/register" className="text-[#2C5DA9] hover:text-[#0A0F3C] font-semibold transition-colors">
                  Register Now
                </a>
              </p>}
            </div>
          </form>
        </DoctorCard>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a href="/doctor/support" className="text-[#2C5DA9] hover:text-[#0A0F3C] font-semibold transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
   </>
  )
}

export default Drlogin
