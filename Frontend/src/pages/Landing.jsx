import { Link } from 'react-router-dom'

export default function Landing({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 text-white grid place-items-center font-bold">E</div>
          <span className="font-semibold">Expense Manager</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <Link to="/home" className="px-3 py-1.5 rounded bg-blue-600 text-white">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded border">Log in</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded bg-blue-600 text-white">Sign up</Link>
            </>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Modern Expense Management<br className="hidden md:block" /> for Teams of Any Size
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Submit expenses in any currency, define flexible multi-level approval flows, and keep your finance team smiling. Built with MERN + Tailwind for speed.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/signup" className="px-5 py-3 rounded bg-blue-600 text-white shadow hover:bg-blue-700">Get started</Link>
            <Link to="/login" className="px-5 py-3 rounded border bg-white hover:bg-gray-50">I already have an account</Link>
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center mb-3">🧭</div>
            <h3 className="font-semibold mb-1">Role-based dashboards</h3>
            <p className="text-sm text-gray-600">Employee, Manager, and Admin views so everyone sees exactly what they need.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center mb-3">✅</div>
            <h3 className="font-semibold mb-1">Approval workflows</h3>
            <p className="text-sm text-gray-600">Manager-first, multi-step, percentage, specific approver, or hybrid rules.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center mb-3">💱</div>
            <h3 className="font-semibold mb-1">Multi-currency</h3>
            <p className="text-sm text-gray-600">Auto-convert to company currency with cached exchange rates and live fallback.</p>
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold">Scan receipts with OCR</h2>
            <p className="mt-2 text-gray-600 text-sm">Upload a receipt, auto-extract amount/date/merchant, and create an expense draft instantly.</p>
            <div className="mt-4 flex gap-3">
              <Link to="/signup" className="px-4 py-2 rounded bg-blue-600 text-white">Try now</Link>
              <Link to="/login" className="px-4 py-2 rounded border">Demo</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-white border rounded-xl shadow-sm h-64 grid place-items-center text-gray-400 p-0 overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswM2iwSsOWlclzjmCCJusPW7r4okfLumgRQ&s"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-white border rounded-xl shadow-sm h-64 grid place-items-center text-gray-400">
           <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQERUQEBMQEBUQDxAPDxUSFhAVEhAQFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLi0BCgoKDg0OGBAQGy0lIB4tLS0tLS0tNy0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKcBLgMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQBAgUGBwj/xABAEAABAwICBwUFBAkFAQEAAAABAAIDBBEhUQUSEzFBYZEiMnGh0QYUUoGxByPh8BZCVGJyk6LB0hUzQ5LCY1P/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAMBEAAgIBBAEDAwIGAgMAAAAAAAECEQMEEiExURNBcQUyYUKRFCJSgcHRobEj4fH/2gAMAwEAAhEDEQA/APpG1dm7qVqedbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dmepQWzMZe7BpcfAlVbS7JipS6LsNC899xHIE/VYSzr2R0w08v1MvRRBu6/zJJWEpyfZ1RhGPRJdVtlqF0tgo6Zgc+JwaSHNGs2xINxw6XWmKe2XJhqcbljddnjBUv367/8As5ehR4m+Xkv02lXbnk+Nz5qHE1jmfudFsxO5x6lQbbmZ2rs3dShNsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbG1dm7qUFsbV2bupQWxtXZu6lBbNEICAIAgCAIAgCAIAgCAXQgmhpXv3CwzOAWcskYmsMM5dF6HRrR3u15Bc8s7fR1Q00V93JdYwDAADwWLbfZ0pJdGygkIAgCAwUB4jTFLspnNG49pvgfxuvSxT3RR4Opx+nka9iktDAmp6lzN2Iy4KKLRm4nVp6pr92ByO9Vo6IzUidC4QBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQAAnAC/goboJX0XIdHOPe7PmVjLPFdHRDTSffBeho2N4XOZxXPLLKR1QwwiWbLM1CEhAEAQBAEAQHE9qKTWjEg3xnH+E7/Oy6dPKpV5ODXY90Ny9jyoXaeSZQGBmEBfptIcH9fVVaNo5fJ0muBFwbqDazKEhAEAQBAEAQBAEAQBAEAQBAEAQBAEAQG8ULn90E8+HVUlOMey0ccpdIvQ6M+M35D1WEtR/SdUNL/Uy9FC1uDQAsHJvs6YwjHpEiqXCAIAgCAIAgK8tW1vG5yChtIUSQyawBzUgkQGk0Yc0tOIcCD4FSnTtFZRUk0zwVTAY3uYd7XEeI4FenGW5WfPTg4ScX7EasVCAwEBPBO5m75jgVDRaMnHo6lPVB/I5eirR0RmmToXCAIAgCAIAgCAIAgCAIAgCAIAgLMNE93DVHP0WUs0Ym0ME5fgvQ6PY3f2jz3dFzyzSfR1Q08Y98lsCyyN6oyoJCAIDDXA7sUBlAEBq54G82QFWSuG5o1j5KNwoj2ckneOqMvwUU2OETMpmMxOPMqaSFs2jqml2qOvBLQosKQEB5n2qpbObKP1uw7xG788l2aafG08rX46amjgLqPPCA2CAyAgNwhJcp6wjB2PPiq0axyV2XmvBxGKg2Ts2QkIAgCAIAgCAIAgCAIAgCA6Oii0giwuDv42XLqLteDs0u1p+TpLmOwIAgNXPA3myAqy14HdF/oochRTlqHO3n5Dcqtk0TaPks7Vz+qmLDOhI+wueCsQUnVbnYMb81W/Aoy2jc7F7r8gm3yLJdaOPL6lTwh2Qmqe/BjfmotvomjLaInF7ifD1U7fJFkhkjj3W8BiUtIcssRuuARxF1INkBV0lS7WNzMxhycMQr45bZJmWbH6kHE8IRbA8MCvTPnwEBsgNwEBshJkKCSWOQt3IWTa6L0NQHYbiq0bRmmToXCAIAgCAIAgCAIAgCAICakl1Hg8Nx8Cs8kd0aNMM9s0zuhcB6YQkrVsrmi7c7HkoboI5r3k4kkqhY1QGUABsbjhigOwxwc2/AhaFSGapazsgYjgMAoboUQ/eyfujp+Kjlk8EjKNrcXG/juU0iLD61owaL+GATcKNNWWTf2R0UcsnhEsdIxuJx8dynbRFkkdQ0nVB9FNoEyAIDx3tFSbObWG6TtDx4/nmvQwT3R+DxNZj2ZL9mc0LY5TIQG4QkyoBuELGQgNkBYhqCMDiPNRRpGddltjwcQoNU7NkJCAIAgCAIAgCAIAgBQHaoJtZgzGB+S4csdsj0sE90CysjY0mZrNIzCMHGItgsywQBAEBe0bJgW5YjwVoshlmXVb2nWyurEFZ1YXYMaTzKruvoUYbSOdi93ySvIsnDWR5D6qeEOyF9aTgwE+Poo3eCaMCle/F5tySm+xZMGRx44Dmd6nhEFhjri444qQZQHL9oaTaREjeztjw4jp9Ftgntl8nJrMe/Hfjk8gvQPFNwgMrmzaqOPjtnpaP6Zl1C3dR8mH34EDxXHPXTa4VHr4vomGLubb/wCCO8gyKzjrMq75N5/R9LLpNfD/ANmwqCN7T8lvHX/1ROLJ9C/on+6JG1TfDxC3jrMT96+ThyfSdVD9N/DJmvB3EFdEZxl0zhyYp43U018okjcRiFYrHgtxTg78Cq0aqVkyFwgCAIAgCAIAgCAIC3oyXVdbg768Fhnjcb8HRp51KvJ2FxnoBAcuvjs6/wAX1VJIlFdQSEBhAT0jXawIB55WUohnTe0EWOIVyCF9QxmA6BRaQog20j+6NUZ/iotsng3joRveS5Tt8kWSPnYzAW8AlpCrIdvI/uiwz/FRbfRNGzKHi8k/nNNvkiyzG5vdFsOA4KwJEBghSQeIr6QxyuYM7t/hO5ehHItm5nhy08vW9OK76JooQPFeVl1M8j/B9PpdBiwJOrl5/wBG5YFgdxjZDIKCbZjYtyQbma7BqDczHuzUJ3M32QAsAB4LTFkeOW5HPqMKz43CX/w1svbhNTimj5HLilim4S7QUsoiWKUjmoLqVFlrwdyF07NkJCAIAgCAIAgCAyDbEcMVDVhOuTvU8ms0OzC8+Udro9WEt0UyRVLleti1m8xiFDXARygqFixFRud+6OfopUSLLTKVjMXY8zuVqSIs1krQMGjWyyTd4FGmykf3jqjL8FFNk8EzKZjMT1KmkiLs1krgMGjW+iOQoj2cr951R+eCjlk8EzKVjcTjzO5TSRFmslc0YNGt9E3CiPUlk39kfngo5ZPBPDTtZjf5lSlRFllSAUIPO6Xla+TAd0at81jkyNraujt0+njF+o1z/gqLE7DBcgF0BlAEAQBAaPC69Ln2Pa+meb9R0nrQ3x+5f8o0C9U+bNggNmmyEk7Jc1BZSJQhcIAgCAIAgCAIDo6Jl3sP8Q/uuXUR/Udeln3E6S5jtBQFYmOPIHzUcIcshNU52DG/NRbfRNGW0ZOL3Jt8iyYmOPIfVTwiOyB1W52Ebfmot+woy2jc7GRxTb5Jsl+7jyHmVPCI7IXVbnYMafFRfgmvIFI52L3fJKvsiyb7uPIfVTwh2ROrHOwY0+Kjd4Jow2kc7F7vkleRZdbhhkrEFDS1ZqDVb3nDoFnklSo30+Lc7fSOEuc9EhqqpkYu9zW5axA+qlJvoi0uzhVXtHTtPf1z+4CfPctFgm/Yq9Vij7mKbTbJcInEEYkHA2VcmOUOzTDmx5ei7Q1sj3WuC0byQr4cLnf4MNbnhgivLdI66xNjKAIDCA0IXqaXNuW19o+e+paT05epHp9/h/8Asyuw8oyEBlCTdjyFBKZM110Lp2bISEAQBAEAQG8Mmq4OyPlxVZx3RaLQltkmd9puvPPVTsyoJIZYGk6zhuHySkCOSrY3AY+G5RaFEOtLJu7I6KOWTwiSOiaMXdr6KdpFm0lUxuAx5DclpCiHXlk3dkfnio5ZPCJI6Joxcdb6KdpFmz6pjMBjyCNpCiLaSybhqj88VHLJ4RvHQgYuOt9FO0izZ9SxmAx5BLSFHLr9PRx4SSxQ8nOGt03+SJSfQ4RQofa6mdJsoTLO52JIaWsaBxJdipcditloRc5bUbSyFxLnYkm65G7PUjFRVI4+nNOR0rce08jssG/xdkFpjxOfwZ5cyxr8nzyurHzvMkh1iejRkBwC74xUVSPMnNzdsgVipLSSaj2uHBw6Heqzjui0aYp7JqXg+lUcAY0DjvJzK2x4ljx0eVqdU9RqFL2TVfFnQXin1hlAEAQGCrRk4tNFMkFOLjLpmoXtwkpRUl7nyGXG8U3B+xsrmYUEmVINghKLCg0CAIAgCAIAgOtoya7bcW4fLguLPGpX5O/TTuNeC6sTpNJWawIPFAQthjjxNvE71FJAjfXcGAk/ngm4Uainkf3zYZfgopvsngmbCxmJt4lTSRFsjkruDASU3CjTYSP75sMvwUU2TaJ2wMZibeJU0kRdkclcNzBrFNwo02Mj+8dUZfgopsnhHlvtB0x7nGyGE2ln1jrcWRt3kZEk26rXHBFWz5WTc3NyTiScSTzK3Kl/Q+lZKV5cwNOsLODtxHjwVJ41NUzTHleN2jsze1k0oLWNbELYkEl3yPBZR08U7fJtPVSapcHKdjicb7743XQcpTqogMRx3oCFAYKA+l6Hn2kEb/iY2/iMD5hdF/yWePKO3NX5OovBPszKAIAgCA1Xfo8vOxnjfVdPaWVe3D/wZXoHhmVIMhAbIWJ1BcIAgCAIAgCAsUMuq8ZHArLLHdE1wT2z+TthcJ6YQFaWkDnaxv4KGrFgyRx4Cw5DenCBCal78GC3NRbfRNGWUROLyT+c02kWSmSOPIchvU8IdkJqnvwYLc1Ft9CvJllETi8k/nNNoslL448h4b1PCHLITVPdgxvzUW/YUfIvtNdINIgPJP3EerlYl1/NdGPoqzzwWhAQG1JOGvLXYXtYoDo3QG3+lzzW2cbnDPANJ5E71R5IrtmkcU5dI2/Rmr//AD/qZ6qvrQ8l/wCHyeDaP2Wqye4G8y5tvJQ88PIWmyeD2egNHOp4RG9wcQXHC9hfG3NYZdQ5LaujfDooQn6j5l/0dRcx2hAEAQBAYKtGTi7RScFOLi+mAvbxzU4qSPkc2J4puD9jKuZmwQlGUJJ1BcIAgCAIAgCAFAdyjm12A/I+IXBkjtk0eninuimTrM1I549YEA2RoEEdGxuJx8dyjbQsSVjRg3Hw3JuFEX3sn7o6fio5ZPCJY6NrcXY+O5SooixJWNbgMfDcjkhRFeWT90dPxUcsnhEsdE0Yux8dynaRYkrGNwGPhuS0KPmH2v07iYKktt3of/bf/S1xO7IZ4tpuFsVNkBHJGDvQHZ9kNECabtklkY13N4OP6oPL0WOee2PHudGnxqcufY+kgcMl556YQBAZQBAEAQBAEBhAXNG0Bldk0d458gu3SOabro836hixzSv7v8EmktHGK7hizeT8I5+q9FOzw8mBx5XRzaWpZK0Pjc17TuLTcFSZtNcMnAUkEyguEAQBAEAQBAEBd0XLZxb8WI8QufPG1Z06adS2+TrLkO8ICnJSlziS7DgFDVizcMjjyHjvSkgRPrScGAn85KN3gUYFM9+L3W5JTfZNkwjjjxwHM71PCI5ZE+tvgwE/nJRu8CjApnvxebDL8EpvsmyzFTNbuHzO9WpEHmPtRodro6QgXMLmTDwabO/pJV4Pkqz4vSygi3ELcgmdIBvIQETqtvMoDRukXtN2EsPAgkHyUNX2Sm10el0FprSryBFFJUj96N1v+4t5lYyw43+DeOpyL8n0LRFJWStvPAKc23bRrr/Iblzyw10zojq0+0STNLHFrsCN6r6M6ui61WFvbuVmt1mbp3yjKgkIAgCAIC1o+hMzsmjvH+w5rbFieR/gwzZljX5PTxRNY0NAAAC9OMVFUjyZScnbPkH2l+3O3LqOld90DaeQf8xH6rT8H18N8lGzyHs9p6WjfdvaY4/eRnc7mMnc1ZOjOeNTR9V0VpOKpjEkTrg7x+s05OHAq9nFKLi6Z0kJCAIAgCAIAgCAy1xBBHA3UNWqJTp2jvxPDgCOIuvOap0erF7kmjdQWIakOI7Bsb+SP8AgjoRveS5Rt8iyR07GYC3gEtIVZDt5H9wWGf4qLb6HBllFxeb/AJzU7RZpPpOnhwL2DkCCfJaxw5JfbFlHOK7ZWj0+HHsRTSZajDbqbBarSyX3NL5ZX1V7WyT3urf3IGR85X/+WhT6eGPcr+F/sjdkfSIqrRdRUMdHNOxrJGuY9sTBi1wsRrOT1MMftjfyxtm+2fKNKfZvXxSFsTBOy/Ye1zB2eGsHEWKopouWqT7L6ojWqJqenAxdcl7gOdrDzUqV8JWHwdum9gNHQta+aaep1yWt2eDXEbwAwE+asoZJNqqrzwVc4rk9Vov2b0cYr08ENntLdYtu/LEuxBCzlvxz/m7RKalHg6Hs7KXU7Ad7Lxu8WEt/sraqKWV178/uRidxR01zmpw/aGn3SD+F39l16eX6Tztbj6mcgLeWOMvuRy48+TH9kmjIcVzvSYmdsfqmoXun/Y2DlnPRL9LOjF9Xlf8A5I/sbArgnCUHUj2cWWGWO6D4MqhqWaCjdK6wwA7xy/Fa4sTyMxzZljV+56iCFrGhrRYBenGKiqR5MpOTtnyz7TPbnW1qGkdhi2pkad+cbD9T8lYo2fLgpIMoCzQaQmgJdC90ZcLO1eI5pZWUVLs+5rQ4QgCAIAgCAIAgCA6eiZcCzLEeBXJnjTs7dLPjadBc51mChBSfFI8kE2F+qrTZPBIylY3E48zuU0hZrJWtGDRrfRNwo5Do5KyV7HEtihIa5ouNd5F8eJAHBdcZPDjUl90vfwjFrfJp9I6VJomCM2axl9+4X6LGWTJLmTbLqMV0iSPScJeY2vaXDW7Iv+rvA4X5KXgyKO5rghZI3SKUXtA2Rryxj7sidM0OsA9rcDYgm2IWz0ji1ufbr4KLMmnSK8WnZJIJpGtZrRNaWlpLm9oXxBxuFpLSxjkhFvsqsrcW/BpTSPmc+n2xlD6dsjZG2BjkJ3Xbw5KZqONLJtqnVeV/chNyuN3wR0lLLPHU7Vpa97GRi+Ac9jd4vwJAVpzhjlj2vhO/3EYykpWWYtHTuijBtHJDK2Rpe4PuLWN9UCw5LN5sanL3UlXHH/ZZQk4ryjp6LotgzVJ1iXue42sC5xubDgFz5svqSuvwaQjtVFb2fP8AvavdNVIWc917fO601P6L72ori9/k6y5TYhq4ddhbmPPgrQltkmZ5Ib4uJ5MtIwO8Gx8V6SfB4jTTphCTIQGQssuKORUzp02pnglcevdeS1Q0jpXWGAHePAD1Xmfw89+1n0S1mOWPfH9j1NNA2Noa0WA8zmV6EIKKpHnTm5u2fOPtL9udnrUVI7tns1Ejf+McWNPxZnh47rFGz5IpICAIAgPvi0PPCAIAgCAIAgCAICWml1HA/I+Cpkjui0Xxz2yTO6CuA9QyoJK9U94A1Be5t4KHYIG0jnYvPyCivJNlqKBrdw+fFWog51D2KqdnxtjmHTVd9AurJ/Nhg/FoxjxOSObNT1HvT54476kjG4mxkj1QHNaDgRxvfgt4yx+ioSfa/ZmbUt7kkX6HRGrO+Z27aF8Ivg3XHbJGaxyai8cYLxT/ALdGkcdSbZPo3RDIWvGBMjn3NrHUccG/JUy6iWRp+KJhjUU/ySUmi4orFgN2s2dyTi3J3Aqs8859v3smOOMQaingB7UMV8SBqi58AmzLk9mxcIlc6fhOEYlmP/zY4jqbBX/hZr7qXyyvrR9uR79Uv/26bV5yvaP6W3Kn0sMfunfwhvm+omrqOqlwllZG094QtOtbLXduRZMMOYxbf5/0htm+3+x06WnbEwMYLNaLALCc3OTlLtmkYqKpEt1QsVqmujj7zhfIYnotI45S6RjkzQh2zzlbMHvLmggHHHPNdsIuMaZ5eWanJyXuQhXMzZAZAQHa0JXtaNm4Btzgczz5qkl7nZp8qX8rPNfaT7ce6g0lK687h948f8DTwH758lQ62z40Tjc4k4kneTmpKhCQgCAID74tDzwgCAIAgCAIAgCAFAdjR02swZtwP9lw5o1L5PR0890PgtrI3CAIAgOXpOnkbI2ohGu5jSyRm4yRnHA5g4rpwzi4vHN0nyn4ZlOLTUkaDTrTgIqku+HZuuPmcFP8K/eUa+SPWXhmffap/cpwznK8D+ltyo9PDH7p38IbpvpfuY92q39+aOPlEy56uU78Eeot/L/0NuR9sz/oTXf7sk8v8TyG9G2T+Ka+1Jf2HpJ9tss0+iYI+7FGOdgT1KzlnyS7kyyxxXSLgFt2CxLmUJMOcBiSB4qSG6OdVaZjbg3tnlu6raOCT74OXJrIR65OVU6Ukfx1Rk31XTDDGJxT1OSf4Ka0MDKEmQgMhAbICGtY90bmxODHlpDHEXDXZ2UFo1fJ8d0lSyxSuZOHB9yXF2Jdf9a/EHNZnpRkpK0ej9hdH0kwl941HPaRqtebAMti4Y449F52uy5YbdnR1YIwd7jzulY42zyNhOtG2RwjO+7fHiu3E5OCcuzGaSk66Kq0KhAEB+hPc5Ph82+qvaOL05D3OT4fNvqloenIe5yfD5t9UtD05D3OT4fNvqloenIe5yfD5t9UtD05D3OT4fNvqloenIe5yfD5t9UtD05D3OT4fNvqloenIe5yfD5t9UtD05D3OT4fNvqloenIs6PhkY7EYOFji35cVlmjujwbYFKMufc6eqVy7Gd1oapTYxaGqU2MWhqlNjFoahTZIWhqFNj8C0NQpskLQ1Cmxi0NUpsYtDVKbGLRgghNkiHJHOqquXdHH83Fn0uto4F+pnLk1E+oROVPT1MnfBPLWZbpddMYxj0cU45p/cRDRsvwebPVWtGfoz8Gw0dL8Pmz1S0W9Gfgf6dL8Pm31UWifSn4MjR0vw+bfVLQ9Kfgz/p8vw+bfVLRPpT8Gw0fL8Pm31S0R6U/Bn3CX4fNvqotE+lPwPcJfh82+qWh6U/BzdOeyvvbNWRlnDuPBZrMPXEckdMvjWSD4R83rPYevjeWbEP1Tg4PhAcMwC4EKh2rlEX6H1/7Of5lP/mhI/Q+v/Zz/Mp/80A/Q+v/AGc/zKf/ADQD9D6/9nP8yn/zQH//2Q==" alt="" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Approvals your way</h2>
            <p className="mt-2 text-gray-600 text-sm">Build sequences (Manager → Finance → Director), set thresholds, or assign specific approvers like CFO.</p>
          </div>
        </section>
      </main>

      <footer className="mt-16 py-8 border-t text-center text-sm text-gray-600">
        <p>Built with MERN + Tailwind · © {new Date().getFullYear()} Expense Manager</p>
      </footer>
    </div>
  )
}

