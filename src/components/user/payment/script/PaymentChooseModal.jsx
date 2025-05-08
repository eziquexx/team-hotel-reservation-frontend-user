import { Button, Modal } from "react-bootstrap";

export default function PaymentChooseModal({show, handleClose }) {
    return (
        <>
            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Body className="text-center payment-modal" style={{margin:"20px 0"}}>결제 방식을 선택해주세요.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}