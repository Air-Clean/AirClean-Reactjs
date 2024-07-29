
import GarbageResource from './Garbage';
import '../HumanResource.css'



function TempResource() {
    console.log('임시저장소 페이지 입니다')

    return (
        <>
            <div className="menu1_layout">
                <div className='flex_wrap'>
                    <GarbageResource/>
                </div>
            </div>
        </>
    );

}

export default TempResource;


